import { prisma } from '../../database/prisma.client';
import { AppError } from '../../shared/middleware/error.middleware';
import { logger } from '../../shared/utils/logger';
import dayjs from 'dayjs';

export interface CrearFacturaDTO {
  clienteId: string;
  sucursalId: string;
  tipoComprobante: string;
  fecha?: Date;
  fechaVencimiento?: Date;
  formaPago: string;
  notas?: string;
  detalles: DetalleFacturaDTO[];
}

export interface DetalleFacturaDTO {
  productoId?: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuento?: number;
  gravadoITBIS?: boolean;
}

export class FacturacionService {
  
  async crearFactura(data: CrearFacturaDTO, usuarioId: string) {
    const { clienteId, sucursalId, tipoComprobante, fecha, fechaVencimiento, formaPago, notas, detalles } = data;

    // Validar cliente
    const cliente = await prisma.cliente.findUnique({
      where: { id: clienteId }
    });

    if (!cliente) {
      throw new AppError('Cliente no encontrado', 404);
    }

    // Validar sucursal
    const sucursal = await prisma.sucursal.findUnique({
      where: { id: sucursalId }
    });

    if (!sucursal) {
      throw new AppError('Sucursal no encontrada', 404);
    }

    // Obtener y validar secuencia NCF
    const secuenciaNcf = await this.obtenerSecuenciaNcfActiva(tipoComprobante);

    if (!secuenciaNcf) {
      throw new AppError(`No hay secuencia NCF activa para el tipo ${tipoComprobante}`, 400);
    }

    // Verificar que la secuencia no esté vencida
    if (dayjs(secuenciaNcf.fechaVencimiento).isBefore(dayjs())) {
      throw new AppError('La secuencia NCF está vencida', 400);
    }

    // Verificar que no se haya agotado la secuencia
    if (secuenciaNcf.secuenciaActual >= secuenciaNcf.secuenciaFin) {
      throw new AppError('La secuencia NCF se ha agotado', 400);
    }

    // Generar NCF
    const ncf = this.generarNCF(
      secuenciaNcf.tipoComprobante,
      secuenciaNcf.serie,
      secuenciaNcf.secuenciaActual + BigInt(1)
    );

    // Calcular montos
    let subtotal = 0;
    let descuentoTotal = 0;
    let itbisTotal = 0;

    const detallesCalculados = detalles.map(detalle => {
      const cantidad = Number(detalle.cantidad);
      const precioUnitario = Number(detalle.precioUnitario);
      const descuento = Number(detalle.descuento || 0);
      const gravadoITBIS = detalle.gravadoITBIS !== false;

      const subtotalLinea = cantidad * precioUnitario;
      const descuentoLinea = subtotalLinea * (descuento / 100);
      const baseImponible = subtotalLinea - descuentoLinea;
      const itbisLinea = gravadoITBIS ? baseImponible * 0.18 : 0;
      const totalLinea = baseImponible + itbisLinea;

      subtotal += subtotalLinea;
      descuentoTotal += descuentoLinea;
      itbisTotal += itbisLinea;

      return {
        ...detalle,
        cantidad,
        precioUnitario,
        descuento: descuentoLinea,
        itbis: itbisLinea,
        total: totalLinea,
        gravadoITBIS
      };
    });

    const total = subtotal - descuentoTotal + itbisTotal;

    // Generar número de factura
    const numeroFactura = await this.generarNumeroFactura();

    // Crear factura en transacción
    const factura = await prisma.$transaction(async (tx) => {
      // Crear factura
      const nuevaFactura = await tx.factura.create({
        data: {
          numero: numeroFactura,
          ncf,
          tipoComprobante,
          secuenciaNcfId: secuenciaNcf.id,
          fecha: fecha || new Date(),
          fechaVencimiento,
          clienteId,
          sucursalId,
          subtotal,
          descuento: descuentoTotal,
          itbis: itbisTotal,
          total,
          estado: formaPago === 'CREDITO' ? 'EMITIDA' : 'PAGADA',
          formaPago,
          notas,
          usuarioCreacion: usuarioId,
          detalles: {
            create: detallesCalculados
          }
        },
        include: {
          detalles: true,
          cliente: true,
          sucursal: true
        }
      });

      // Actualizar secuencia NCF
      await tx.secuenciaNcf.update({
        where: { id: secuenciaNcf.id },
        data: {
          secuenciaActual: secuenciaNcf.secuenciaActual + BigInt(1)
        }
      });

      // Si es a crédito, crear cuenta por cobrar
      if (formaPago === 'CREDITO') {
        await tx.cuentaPorCobrar.create({
          data: {
            facturaId: nuevaFactura.id,
            clienteId,
            montoTotal: total,
            montoPagado: 0,
            saldoPendiente: total,
            fechaEmision: fecha || new Date(),
            fechaVencimiento: fechaVencimiento || dayjs().add(30, 'days').toDate(),
            estado: 'PENDIENTE',
            diasVencidos: 0
          }
        });
      }

      // Crear asiento contable
      await this.crearAsientoContableFactura(tx, nuevaFactura, usuarioId);

      return nuevaFactura;
    });

    logger.info(`Factura creada: ${numeroFactura} - NCF: ${ncf}`);

    return factura;
  }

  async obtenerFactura(id: string) {
    const factura = await prisma.factura.findUnique({
      where: { id },
      include: {
        detalles: {
          include: {
            producto: true
          }
        },
        cliente: true,
        sucursal: true,
        pagos: true,
        cuentaPorCobrar: true
      }
    });

    if (!factura) {
      throw new AppError('Factura no encontrada', 404);
    }

    return factura;
  }

  async listarFacturas(filtros: any = {}) {
    const { page = 1, limit = 20, clienteId, desde, hasta, estado } = filtros;

    const where: any = {};

    if (clienteId) where.clienteId = clienteId;
    if (estado) where.estado = estado;
    if (desde || hasta) {
      where.fecha = {};
      if (desde) where.fecha.gte = new Date(desde);
      if (hasta) where.fecha.lte = new Date(hasta);
    }

    const [facturas, total] = await Promise.all([
      prisma.factura.findMany({
        where,
        include: {
          cliente: true,
          sucursal: true
        },
        orderBy: { fecha: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.factura.count({ where })
    ]);

    return {
      facturas,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async anularFactura(id: string, motivoAnulacion: string, usuarioId: string) {
    const factura = await prisma.factura.findUnique({
      where: { id }
    });

    if (!factura) {
      throw new AppError('Factura no encontrada', 404);
    }

    if (factura.anulada) {
      throw new AppError('La factura ya está anulada', 400);
    }

    // Anular factura en transacción
    const facturaAnulada = await prisma.$transaction(async (tx) => {
      // Actualizar factura
      const updated = await tx.factura.update({
        where: { id },
        data: {
          anulada: true,
          motivoAnulacion,
          estado: 'ANULADA'
        }
      });

      // Si tenía cuenta por cobrar, anularla también
      await tx.cuentaPorCobrar.updateMany({
        where: { facturaId: id },
        data: { estado: 'PAGADA' } // Marcar como pagada para que no aparezca en pendientes
      });

      return updated;
    });

    logger.info(`Factura anulada: ${factura.numero} - Motivo: ${motivoAnulacion}`);

    return facturaAnulada;
  }

  private async obtenerSecuenciaNcfActiva(tipoComprobante: string) {
    return await prisma.secuenciaNcf.findFirst({
      where: {
        tipoComprobante,
        activo: true,
        fechaVencimiento: {
          gte: new Date()
        },
        secuenciaActual: {
          lt: prisma.secuenciaNcf.fields.secuenciaFin
        }
      },
      orderBy: { fechaVencimiento: 'desc' }
    });
  }

  private generarNCF(tipo: string, serie: string, secuencia: bigint): string {
    // Formato: B01 + serie (3 dígitos) + secuencia (8 dígitos)
    // Ejemplo: B010011234567890
    const secuenciaStr = secuencia.toString().padStart(8, '0');
    return `${tipo}${serie}${secuenciaStr}`;
  }

  private async generarNumeroFactura(): Promise<string> {
    const año = dayjs().year();
    const mes = dayjs().month() + 1;
    
    // Buscar el último número de factura del mes
    const ultimaFactura = await prisma.factura.findFirst({
      where: {
        numero: {
          startsWith: `${año}${mes.toString().padStart(2, '0')}`
        }
      },
      orderBy: { numero: 'desc' }
    });

    let secuencia = 1;
    if (ultimaFactura) {
      const ultimoNumero = parseInt(ultimaFactura.numero.slice(-6));
      secuencia = ultimoNumero + 1;
    }

    // Formato: AAAAMM-NNNNNN
    return `${año}${mes.toString().padStart(2, '0')}-${secuencia.toString().padStart(6, '0')}`;
  }

  private async crearAsientoContableFactura(tx: any, factura: any, usuarioId: string) {
    // Este es un ejemplo simplificado del asiento contable
    // Débito: Cuentas por Cobrar (si es a crédito) o Caja/Banco (si es de contado)
    // Crédito: Ventas
    // Crédito: ITBIS por Pagar

    const año = dayjs().year();
    const mes = dayjs().month() + 1;

    // Buscar período contable
    let periodo = await tx.periodo.findFirst({
      where: { año, mes }
    });

    if (!periodo) {
      // Crear período si no existe
      periodo = await tx.periodo.create({
        data: {
          año,
          mes,
          fechaInicio: dayjs(`${año}-${mes}-01`).toDate(),
          fechaFin: dayjs(`${año}-${mes}-01`).endOf('month').toDate(),
          descripcion: `${año}-${mes.toString().padStart(2, '0')}`,
          cerrado: false
        }
      });
    }

    // En producción, estas cuentas deberían obtenerse de la configuración
    // o del plan de cuentas según el tipo de negocio
    // Por ahora, esto es solo un ejemplo estructural

    const numeroAsiento = `ASI-${factura.numero}`;
    
    const debitos = factura.total;
    const creditoVentas = factura.subtotal - factura.descuento;
    const creditoITBIS = factura.itbis;

    // Crear asiento (estructura básica)
    // En implementación real, debe buscar las cuentas del plan contable
    /*
    await tx.asientoContable.create({
      data: {
        numero: numeroAsiento,
        fecha: factura.fecha,
        tipo: 'DIARIO',
        concepto: `Factura ${factura.numero} - Cliente: ${factura.cliente.razonSocial || factura.cliente.nombre}`,
        periodoId: periodo.id,
        debitos,
        creditos: debitos,
        esCuadrado: true,
        usuarioCreacion: usuarioId,
        moduloOrigen: 'FACTURACION',
        documentoReferencia: factura.numero,
        detalles: {
          create: [
            // Débito - Cuentas por Cobrar o Caja
            {
              cuentaId: 'cuenta-cxc-o-caja-id',
              descripcion: `Venta según factura ${factura.numero}`,
              debito: debitos,
              credito: 0
            },
            // Crédito - Ventas
            {
              cuentaId: 'cuenta-ventas-id',
              descripcion: `Venta según factura ${factura.numero}`,
              debito: 0,
              credito: creditoVentas
            },
            // Crédito - ITBIS por Pagar
            {
              cuentaId: 'cuenta-itbis-por-pagar-id',
              descripcion: `ITBIS factura ${factura.numero}`,
              debito: 0,
              credito: creditoITBIS
            }
          ]
        }
      }
    });
    */
  }

  async registrarPago(facturaId: string, montoPago: number, formaPago: string, numeroReferencia?: string, usuarioId?: string) {
    const factura = await prisma.factura.findUnique({
      where: { id: facturaId },
      include: { cuentaPorCobrar: true }
    });

    if (!factura) {
      throw new AppError('Factura no encontrada', 404);
    }

    if (factura.anulada) {
      throw new AppError('No se puede registrar pago en una factura anulada', 400);
    }

    const resultado = await prisma.$transaction(async (tx) => {
      // Registrar pago
      const pago = await tx.pagoFactura.create({
        data: {
          facturaId,
          fecha: new Date(),
          monto: montoPago,
          formaPago,
          numeroReferencia,
          usuarioCreacion: usuarioId || 'SYSTEM'
        }
      });

      // Actualizar cuenta por cobrar si existe
      if (factura.cuentaPorCobrar) {
        const nuevoMontoPagado = Number(factura.cuentaPorCobrar.montoPagado) + montoPago;
        const nuevoSaldo = Number(factura.cuentaPorCobrar.montoTotal) - nuevoMontoPagado;

        await tx.cuentaPorCobrar.update({
          where: { id: factura.cuentaPorCobrar.id },
          data: {
            montoPagado: nuevoMontoPagado,
            saldoPendiente: nuevoSaldo,
            estado: nuevoSaldo <= 0 ? 'PAGADA' : 'PAGADA_PARCIAL'
          }
        });
      }

      // Actualizar estado de factura
      const totalPagos = await tx.pagoFactura.aggregate({
        where: { facturaId },
        _sum: { monto: true }
      });

      const montoPagadoTotal = Number(totalPagos._sum.monto || 0);
      
      await tx.factura.update({
        where: { id: facturaId },
        data: {
          estado: montoPagadoTotal >= Number(factura.total) ? 'PAGADA' : 'EMITIDA'
        }
      });

      return pago;
    });

    logger.info(`Pago registrado para factura ${factura.numero}: ${montoPago}`);

    return resultado;
  }
}
