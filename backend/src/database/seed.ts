import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import {
  PROVINCIAS_RD,
  NOMBRES_PERSONAS,
  APELLIDOS_RD,
  RAZONES_SOCIALES_EMPRESAS,
  NOMBRES_COMERCIALES,
  PRODUCTOS_SERVICIOS,
  UNIDADES_MEDIDA,
  BANCOS_RD,
  CONCEPTOS_ASIENTO,
  CONCEPTOS_MOV_BANCO,
  TIPOS_ACTIVO_FIJO,
  rncFake,
  cedulaFake,
  randInt,
  pick,
  pickMany,
} from './mock-data';

const prisma = new PrismaClient();

const D = (n: number) => n; // decimal as number for Prisma

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // ============================================================================
  // 1. CREAR EMPRESA PRINCIPAL
  // ============================================================================
  console.log('📦 Creando empresa...');
  
  const empresa = await prisma.empresa.upsert({
    where: { rnc: process.env.EMPRESA_RNC || '000000000' },
    update: {},
    create: {
      rnc: process.env.EMPRESA_RNC || '000000000',
      razonSocial: process.env.EMPRESA_RAZON_SOCIAL || 'Mi Empresa SRL',
      nombreComercial: 'Mi Empresa',
      telefono: '809-555-0000',
      email: 'info@miempresa.com.do',
      direccion: 'Av. Principal #123',
      ciudad: 'Santiago',
      provincia: 'Santiago',
      pais: 'República Dominicana',
      contribuyenteITBIS: true,
      regimenEspecial: false,
      tipoContribuyente: 'PERSONA_JURIDICA',
      monedaBase: 'DOP',
      activo: true
    }
  });

  console.log(`✅ Empresa creada: ${empresa.razonSocial}`);

  // ============================================================================
  // 2. CREAR SUCURSAL PRINCIPAL
  // ============================================================================
  console.log('🏢 Creando sucursal principal...');
  
  const sucursal = await prisma.sucursal.upsert({
    where: { 
      empresaId_codigo: {
        empresaId: empresa.id,
        codigo: '001'
      }
    },
    update: {},
    create: {
      empresaId: empresa.id,
      codigo: '001',
      nombre: 'Sucursal Principal',
      direccion: 'Av. Principal #123',
      telefono: '809-555-0000',
      esPrincipal: true,
      activo: true
    }
  });

  console.log(`✅ Sucursal creada: ${sucursal.nombre}`);

  // ============================================================================
  // 3. CREAR ROLES
  // ============================================================================
  console.log('👥 Creando roles...');

  const rolAdministrador = await prisma.rol.upsert({
    where: { nombre: 'Administrador' },
    update: {},
    create: {
      nombre: 'Administrador',
      descripcion: 'Acceso total al sistema - Control completo de todas las funcionalidades',
      permisos: JSON.stringify(['*']),
      activo: true
    }
  });

  const rolContador = await prisma.rol.upsert({
    where: { nombre: 'Contador' },
    update: {},
    create: {
      nombre: 'Contador',
      descripcion: 'Acceso a contabilidad, reportes y consultas',
      permisos: JSON.stringify([
        'contabilidad:*',
        'reportes:*',
        'facturas:ver',
        'clientes:ver',
        'suplidores:ver',
        'inventario:ver',
        'bancos:ver'
      ]),
      activo: true
    }
  });

  const rolVendedor = await prisma.rol.upsert({
    where: { nombre: 'Vendedor' },
    update: {},
    create: {
      nombre: 'Vendedor',
      descripcion: 'Acceso a facturación y gestión de clientes',
      permisos: JSON.stringify([
        'facturas:crear',
        'facturas:ver',
        'clientes:*',
        'inventario:ver',
        'reportes:ver'
      ]),
      activo: true
    }
  });

  const rolAlmacenista = await prisma.rol.upsert({
    where: { nombre: 'Almacenista' },
    update: {},
    create: {
      nombre: 'Almacenista',
      descripcion: 'Acceso a gestión de inventario',
      permisos: JSON.stringify([
        'inventario:*',
        'productos:*',
        'compras:ver'
      ]),
      activo: true
    }
  });

  const rolConsulta = await prisma.rol.upsert({
    where: { nombre: 'Consulta' },
    update: {},
    create: {
      nombre: 'Consulta',
      descripcion: 'Solo lectura - Sin permisos de modificación',
      permisos: JSON.stringify([
        'facturas:ver',
        'clientes:ver',
        'inventario:ver',
        'reportes:ver',
        'contabilidad:ver'
      ]),
      activo: true
    }
  });

  console.log(`✅ Roles creados: 5 roles`);

  // ============================================================================
  // 4. CREAR USUARIO ADMINISTRADOR
  // ============================================================================
  console.log('👤 Creando usuario administrador...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const usuarioAdmin = await prisma.usuario.upsert({
    where: { nombreUsuario: 'admin' },
    update: {
      password: adminPassword, // Actualizar password si ya existe
    },
    create: {
      nombreUsuario: 'admin',
      email: 'admin@sistemacontable.com.do',
      password: adminPassword,
      nombreCompleto: 'Administrador del Sistema',
      rolId: rolAdministrador.id,
      sucursalId: sucursal.id,
      activo: true
    }
  });

  console.log(`✅ Usuario administrador creado`);
  console.log(`   👤 Usuario: admin`);
  console.log(`   🔑 Contraseña: admin123`);
  console.log(`   ⚠️  IMPORTANTE: Cambiar contraseña en producción`);

  // Crear usuarios de ejemplo adicionales
  const contadorPassword = await bcrypt.hash('contador123', 10);
  const usuarioContador = await prisma.usuario.upsert({
    where: { nombreUsuario: 'contador' },
    update: {},
    create: {
      nombreUsuario: 'contador',
      email: 'contador@sistemacontable.com.do',
      password: contadorPassword,
      nombreCompleto: 'María Pérez - Contadora',
      rolId: rolContador.id,
      sucursalId: sucursal.id,
      activo: true
    }
  });

  const vendedorPassword = await bcrypt.hash('vendedor123', 10);
  const usuarioVendedor = await prisma.usuario.upsert({
    where: { nombreUsuario: 'vendedor' },
    update: {},
    create: {
      nombreUsuario: 'vendedor',
      email: 'vendedor@sistemacontable.com.do',
      password: vendedorPassword,
      nombreCompleto: 'Juan García - Vendedor',
      rolId: rolVendedor.id,
      sucursalId: sucursal.id,
      activo: true
    }
  });

  console.log(`✅ Usuarios de ejemplo creados: contador, vendedor`);

  // ============================================================================
  // 5. CREAR PLAN DE CUENTAS BÁSICO
  // ============================================================================
  console.log('📊 Creando plan de cuentas básico...');

  // Nivel 1 - Cuentas principales
  const activos = await prisma.planCuentas.upsert({
    where: { codigo: '1' },
    update: {},
    create: {
      codigo: '1',
      nombre: 'ACTIVOS',
      nivel: 1,
      tipoCuenta: 'ACTIVO',
      naturaleza: 'DEUDORA',
      aceptaMovimiento: false,
      activo: true
    }
  });

  const pasivos = await prisma.planCuentas.upsert({
    where: { codigo: '2' },
    update: {},
    create: {
      codigo: '2',
      nombre: 'PASIVOS',
      nivel: 1,
      tipoCuenta: 'PASIVO',
      naturaleza: 'ACREEDORA',
      aceptaMovimiento: false,
      activo: true
    }
  });

  const patrimonio = await prisma.planCuentas.upsert({
    where: { codigo: '3' },
    update: {},
    create: {
      codigo: '3',
      nombre: 'PATRIMONIO',
      nivel: 1,
      tipoCuenta: 'PATRIMONIO',
      naturaleza: 'ACREEDORA',
      aceptaMovimiento: false,
      activo: true
    }
  });

  const ingresos = await prisma.planCuentas.upsert({
    where: { codigo: '4' },
    update: {},
    create: {
      codigo: '4',
      nombre: 'INGRESOS',
      nivel: 1,
      tipoCuenta: 'INGRESO',
      naturaleza: 'ACREEDORA',
      aceptaMovimiento: false,
      activo: true
    }
  });

  const gastos = await prisma.planCuentas.upsert({
    where: { codigo: '5' },
    update: {},
    create: {
      codigo: '5',
      nombre: 'GASTOS',
      nivel: 1,
      tipoCuenta: 'GASTO',
      naturaleza: 'DEUDORA',
      aceptaMovimiento: false,
      activo: true
    }
  });

  // Nivel 2 - Subcuentas principales (upsert para ser idempotente)
  const nivel2 = [
    { codigo: '1.1', nombre: 'ACTIVOS CORRIENTES', nivel: 2, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activos.id, aceptaMovimiento: false },
    { codigo: '1.2', nombre: 'ACTIVOS FIJOS', nivel: 2, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activos.id, aceptaMovimiento: false },
    { codigo: '2.1', nombre: 'PASIVOS CORRIENTES', nivel: 2, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivos.id, aceptaMovimiento: false },
    { codigo: '2.2', nombre: 'PASIVOS A LARGO PLAZO', nivel: 2, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivos.id, aceptaMovimiento: false },
    { codigo: '3.1', nombre: 'CAPITAL SOCIAL', nivel: 2, tipoCuenta: 'PATRIMONIO', naturaleza: 'ACREEDORA', cuentaPadreId: patrimonio.id, aceptaMovimiento: false },
    { codigo: '3.2', nombre: 'UTILIDADES RETENIDAS', nivel: 2, tipoCuenta: 'PATRIMONIO', naturaleza: 'ACREEDORA', cuentaPadreId: patrimonio.id, aceptaMovimiento: false },
    { codigo: '4.1', nombre: 'INGRESOS OPERACIONALES', nivel: 2, tipoCuenta: 'INGRESO', naturaleza: 'ACREEDORA', cuentaPadreId: ingresos.id, aceptaMovimiento: false },
    { codigo: '5.1', nombre: 'GASTOS OPERACIONALES', nivel: 2, tipoCuenta: 'GASTO', naturaleza: 'DEUDORA', cuentaPadreId: gastos.id, aceptaMovimiento: false },
  ];
  for (const row of nivel2) {
    await prisma.planCuentas.upsert({
      where: { codigo: row.codigo },
      update: {},
      create: row,
    });
  }

  // Obtener las cuentas de nivel 2 para crear nivel 3
  const activosCorrientes = await prisma.planCuentas.findUnique({ where: { codigo: '1.1' } });
  const pasivosCorrientes = await prisma.planCuentas.findUnique({ where: { codigo: '2.1' } });
  const ingresosOp = await prisma.planCuentas.findUnique({ where: { codigo: '4.1' } });

  // Nivel 3 - Cuentas de detalle (upsert para ser idempotente)
  const nivel3 = [
    { codigo: '1.1.1', nombre: 'CAJA Y BANCOS', nivel: 3, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activosCorrientes!.id, aceptaMovimiento: false },
    { codigo: '1.1.2', nombre: 'CUENTAS POR COBRAR', nivel: 3, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activosCorrientes!.id, aceptaMovimiento: true },
    { codigo: '1.1.3', nombre: 'INVENTARIOS', nivel: 3, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activosCorrientes!.id, aceptaMovimiento: true },
    { codigo: '2.1.1', nombre: 'CUENTAS POR PAGAR', nivel: 3, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivosCorrientes!.id, aceptaMovimiento: true },
    { codigo: '2.1.2', nombre: 'ITBIS POR PAGAR', nivel: 3, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivosCorrientes!.id, aceptaMovimiento: true },
    { codigo: '2.1.3', nombre: 'ISR POR PAGAR', nivel: 3, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivosCorrientes!.id, aceptaMovimiento: true },
    { codigo: '4.1.1', nombre: 'VENTAS', nivel: 3, tipoCuenta: 'INGRESO', naturaleza: 'ACREEDORA', cuentaPadreId: ingresosOp!.id, aceptaMovimiento: true },
  ];
  for (const row of nivel3) {
    await prisma.planCuentas.upsert({
      where: { codigo: row.codigo },
      update: {},
      create: row,
    });
  }

  const cajaYBancos = await prisma.planCuentas.findUnique({ where: { codigo: '1.1.1' } });

  // Nivel 4 - Cuentas específicas (upsert para ser idempotente)
  const nivel4 = [
    { codigo: '1.1.1.1', nombre: 'CAJA GENERAL', nivel: 4, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: cajaYBancos!.id, aceptaMovimiento: true },
    { codigo: '1.1.1.2', nombre: 'BANCO POPULAR', nivel: 4, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: cajaYBancos!.id, aceptaMovimiento: true },
    { codigo: '1.1.1.3', nombre: 'BANCO BHD', nivel: 4, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: cajaYBancos!.id, aceptaMovimiento: true },
  ];
  for (const row of nivel4) {
    await prisma.planCuentas.upsert({
      where: { codigo: row.codigo },
      update: {},
      create: row,
    });
  }

  console.log(`✅ Plan de cuentas básico creado`);

  // ============================================================================
  // 6. CREAR SECUENCIAS NCF
  // ============================================================================
  console.log('📝 Creando secuencias NCF...');

  const fechaVencimiento = dayjs().add(1, 'year').toDate();
  const secuenciasData = [
    { tipoComprobante: 'B01', serie: '001', secuenciaInicio: 1, secuenciaFin: 100000 },
    { tipoComprobante: 'B02', serie: '001', secuenciaInicio: 1, secuenciaFin: 100000 },
    { tipoComprobante: 'B03', serie: '001', secuenciaInicio: 1, secuenciaFin: 50000 },
    { tipoComprobante: 'B04', serie: '001', secuenciaInicio: 1, secuenciaFin: 50000 },
    { tipoComprobante: 'B14', serie: '001', secuenciaInicio: 1, secuenciaFin: 10000 },
    { tipoComprobante: 'B15', serie: '001', secuenciaInicio: 1, secuenciaFin: 10000 },
  ];
  for (const s of secuenciasData) {
    const existe = await prisma.secuenciaNcf.findFirst({
      where: { tipoComprobante: s.tipoComprobante, serie: s.serie },
    });
    if (!existe) {
      await prisma.secuenciaNcf.create({
        data: {
          ...s,
          secuenciaActual: 0,
          fechaVencimiento,
          activo: true,
        },
      });
    }
  }

  console.log(`✅ Secuencias NCF creadas para todos los tipos`);

  // ============================================================================
  // 7. CREAR PERÍODOS CONTABLES
  // ============================================================================
  console.log('📅 Creando períodos contables...');

  const anioActual = dayjs().year();
  
  for (let mes = 1; mes <= 12; mes++) {
    await prisma.periodo.upsert({
      where: {
        anio_mes: {
          anio: anioActual,
          mes
        }
      },
      update: {},
      create: {
        anio: anioActual,
        mes,
        fechaInicio: dayjs(`${anioActual}-${mes}-01`).toDate(),
        fechaFin: dayjs(`${anioActual}-${mes}-01`).endOf('month').toDate(),
        descripcion: `${anioActual}-${mes.toString().padStart(2, '0')}`,
        cerrado: mes < dayjs().month() + 1 // Cerrar meses anteriores
      }
    });
  }

  console.log(`✅ Períodos contables creados para ${anioActual}`);

  // ============================================================================
  // 8. CREAR CATEGORÍAS DE PRODUCTOS
  // ============================================================================
  console.log('📦 Creando categorías de productos...');

  for (const c of [
    { codigo: 'CAT001', nombre: 'Productos', descripcion: 'Productos generales', activo: true },
    { codigo: 'CAT002', nombre: 'Servicios', descripcion: 'Servicios profesionales', activo: true },
    { codigo: 'CAT003', nombre: 'Materias Primas', descripcion: 'Insumos y materias primas', activo: true },
  ]) {
    await prisma.categoriaProducto.upsert({
      where: { codigo: c.codigo },
      update: {},
      create: c,
    });
  }

  console.log(`✅ Categorías de productos creadas`);

  // ============================================================================
  // 9. CREAR CUENTA BANCARIA DE EJEMPLO
  // ============================================================================
  console.log('🏦 Creando cuenta bancaria...');

  let cuentaPrincipal = await prisma.cuentaBancaria.findFirst();
  if (!cuentaPrincipal) {
    cuentaPrincipal = await prisma.cuentaBancaria.create({
      data: {
        banco: 'Banco Popular Dominicano',
        numeroCuenta: '802-1234567',
        tipoCuenta: 'CORRIENTE',
        moneda: 'DOP',
        saldoInicial: 0,
        saldoActual: 0,
        activo: true,
      },
    });
  }

  console.log(`✅ Cuenta bancaria creada`);

  // ============================================================================
  // MOCK HIPERREALISTA - DATOS INCONMENSURABLES
  // ============================================================================
  console.log('\n📦 Generando mock masivo hiperrealista...\n');

  const periodos = await prisma.periodo.findMany({ orderBy: [{ anio: 'asc' }, { mes: 'asc' }] });
  const categorias = await prisma.categoriaProducto.findMany();
  const secuencias = await prisma.secuenciaNcf.findMany({ where: { activo: true } });
  const secB01 = secuencias.find((s) => s.tipoComprobante === 'B01')!;

  // --- Sucursales adicionales ---
  console.log('   Sucursales adicionales...');
  const sucursales = await prisma.sucursal.findMany({ where: { empresaId: empresa.id } });
  for (const [i, nombre] of ['Sucursal Norte', 'Sucursal Este', 'Sucursal Sur'].entries()) {
    await prisma.sucursal.upsert({
      where: { empresaId_codigo: { empresaId: empresa.id, codigo: `00${i + 2}` } },
      update: {},
      create: {
        empresaId: empresa.id,
        codigo: `00${i + 2}`,
        nombre,
        direccion: `Calle ${i + 1} #${(i + 1) * 10}`,
        telefono: `809-55${i}-${String(i + 1).padStart(4, '0')}`,
        esPrincipal: false,
        activo: true,
      },
    });
  }
  const todasSucursales = await prisma.sucursal.findMany({ where: { empresaId: empresa.id } });

  // --- Centros de costo ---
  console.log('   Centros de costo...');
  const centrosNombre = ['Ventas', 'Administración', 'Producción', 'Logística', 'TI', 'RRHH', 'Marketing', 'Almacén', 'Contabilidad', 'Gerencia'];
  for (let i = 0; i < centrosNombre.length; i++) {
    await prisma.centroCosto.upsert({
      where: { codigo: `CC${String(i + 1).padStart(3, '0')}` },
      update: {},
      create: {
        codigo: `CC${String(i + 1).padStart(3, '0')}`,
        nombre: centrosNombre[i],
        descripcion: `Centro de costo ${centrosNombre[i]}`,
        activo: true,
      },
    });
  }

  // --- Clientes (150) ---
  console.log('   Clientes (150)...');
  for (let i = 0; i < 150; i++) {
    const esEmpresa = i % 3 !== 0;
    const tipoDoc = esEmpresa ? 'RNC' : (i % 2 === 0 ? 'CEDULA' : 'PASAPORTE');
    const identificacion = esEmpresa ? rncFake(i + 1000) : (tipoDoc === 'CEDULA' ? cedulaFake(i + 2000) : `P${cedulaFake(i + 3000).slice(0, 9)}`);
    await prisma.cliente.upsert({
      where: { tipoIdentificacion_identificacion: { tipoIdentificacion: tipoDoc, identificacion } },
      update: {},
      create: {
        tipoIdentificacion: tipoDoc,
        identificacion,
        razonSocial: esEmpresa ? pick(RAZONES_SOCIALES_EMPRESAS, i) : undefined,
        nombre: esEmpresa ? undefined : pick(NOMBRES_PERSONAS, i),
        apellido: esEmpresa ? undefined : pick(APELLIDOS_RD, i + 100),
        nombreComercial: pick(NOMBRES_COMERCIALES, i + 50),
        email: `cliente${i}@example.com`,
        telefono: `809-5${randInt(5, 7)}${randInt(100, 999)}-${randInt(1000, 9999)}`,
        direccion: `Calle ${randInt(1, 100)} #${randInt(1, 200)}`,
        ciudad: pick(PROVINCIAS_RD, i),
        provincia: pick(PROVINCIAS_RD, i + 7),
        tipoCliente: pick(['FINAL', 'CREDITO_FISCAL', 'GUBERNAMENTAL', 'ESPECIAL'], i),
        limiteCredito: i % 4 === 0 ? D(randInt(50000, 500000)) : null,
        plazoCredito: i % 4 === 0 ? randInt(15, 60) : null,
        activo: true,
      },
    });
  }
  const clientes = await prisma.cliente.findMany({ take: 150 });

  // --- Categorías y productos (200) ---
  console.log('   Productos (200)...');
  const catsExtra = ['Electrónicos', 'Ferretería', 'Oficina', 'Limpieza', 'Bebidas'];
  for (const [idx, nom] of catsExtra.entries()) {
    await prisma.categoriaProducto.upsert({
      where: { codigo: `CAT${String(100 + idx).padStart(3, '0')}` },
      update: {},
      create: { codigo: `CAT${String(100 + idx).padStart(3, '0')}`, nombre: nom, activo: true },
    });
  }
  const todasCategorias = await prisma.categoriaProducto.findMany();
  for (let i = 0; i < 200; i++) {
    const nombre = PRODUCTOS_SERVICIOS[i % PRODUCTOS_SERVICIOS.length];
    const codigo = `PRD-${String(i + 1).padStart(5, '0')}`;
    await prisma.producto.upsert({
      where: { codigo },
      update: {},
      create: {
        codigo,
        nombre: `${nombre} (${i})`,
        descripcion: `Producto/servicio: ${nombre}`,
        categoriaId: pick(todasCategorias, i)?.id ?? null,
        tipoProducto: i % 5 === 0 ? 'SERVICIO' : 'BIEN',
        unidadMedida: pick(UNIDADES_MEDIDA, i),
        controlaInventario: i % 5 !== 0,
        stockMinimo: i % 5 !== 0 ? D(randInt(5, 50)) : null,
        stockMaximo: i % 5 !== 0 ? D(randInt(100, 500)) : null,
        costoPromedio: D(randInt(50, 5000)),
        precioVenta: D(randInt(100, 8000)),
        gravadoITBIS: i % 10 !== 0,
        porcentajeITBIS: 18,
        activo: true,
      },
    });
  }
  const productos = await prisma.producto.findMany({ take: 200 });

  // --- Suplidores (60) ---
  console.log('   Suplidores (60)...');
  for (let i = 0; i < 60; i++) {
    const rnc = rncFake(i + 5000);
    await prisma.suplidor.upsert({
      where: { tipoIdentificacion_identificacion: { tipoIdentificacion: 'RNC', identificacion: rnc } },
      update: {},
      create: {
        tipoIdentificacion: 'RNC',
        identificacion: rnc,
        razonSocial: pick(RAZONES_SOCIALES_EMPRESAS, i + 20),
        nombreComercial: pick(NOMBRES_COMERCIALES, i),
        email: `suplidor${i}@example.com`,
        telefono: `809-5${randInt(5, 7)}${randInt(100, 999)}-${randInt(1000, 9999)}`,
        direccion: `Av. Suplidor ${i + 1}`,
        ciudad: pick(PROVINCIAS_RD, i),
        provincia: pick(PROVINCIAS_RD, i),
        tipoSuplidor: pick(['BIEN', 'SERVICIO', 'MIXTO'], i),
        plazoCredito: randInt(0, 3) ? randInt(15, 45) : null,
        activo: true,
      },
    });
  }
  const suplidores = await prisma.suplidor.findMany({ take: 60 });

  // --- Cuentas bancarias y movimientos ---
  console.log('   Cuentas bancarias y movimientos...');
  const bancosIds: string[] = [cuentaPrincipal.id];
  for (let b = 1; b <= 2; b++) {
    const cb = await prisma.cuentaBancaria.create({
      data: {
        banco: BANCOS_RD[b % BANCOS_RD.length],
        numeroCuenta: `802-${String(1000000 + b).padStart(7, '0')}`,
        tipoCuenta: b === 1 ? 'CORRIENTE' : 'AHORRO',
        moneda: 'DOP',
        saldoInicial: D(randInt(100000, 2000000)),
        saldoActual: D(randInt(100000, 2000000)),
        activo: true,
      },
    });
    bancosIds.push(cb.id);
  }
  const cuentaBancoId = bancosIds[0];
  let saldoBanco = Number((await prisma.cuentaBancaria.findUnique({ where: { id: cuentaBancoId } }))?.saldoActual ?? 0);
  for (let m = 0; m < 80; m++) {
    const fecha = dayjs().subtract(randInt(1, 180), 'day').toDate();
    const monto = D(randInt(5000, 150000));
    const tipo = pick(['DEPOSITO', 'RETIRO', 'TRANSFERENCIA', 'INTERES', 'COMISION'], m);
    const suma = tipo === 'DEPOSITO' || tipo === 'TRANSFERENCIA' || tipo === 'INTERES' ? 1 : -1;
    saldoBanco += monto * suma;
    await prisma.movimientoBancario.create({
      data: {
        cuentaBancariaId: cuentaBancoId,
        fecha,
        tipo,
        numeroDocumento: tipo === 'RETIRO' ? `CHQ-${m + 1000}` : undefined,
        concepto: pick(CONCEPTOS_MOV_BANCO, m),
        monto: D(monto),
        saldoAnterior: D(saldoBanco - monto * suma),
        saldoNuevo: D(saldoBanco),
        conciliado: dayjs(fecha).isBefore(dayjs().subtract(30, 'day')),
        usuarioCreacion: usuarioAdmin.id,
      },
    });
  }
  await prisma.cuentaBancaria.update({
    where: { id: cuentaBancoId },
    data: { saldoActual: D(saldoBanco) },
  });

  // --- Facturas (400+) y detalles, cuentas por cobrar, pagos ---
  console.log('   Facturas (400+)...');
  let secActual = secB01.secuenciaActual;
  const formasPago = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'CREDITO', 'CHEQUE'];
  const estadosFactura = ['BORRADOR', 'EMITIDA', 'ANULADA', 'PAGADA'];
  for (let f = 0; f < 420; f++) {
    const fecha = dayjs().subtract(randInt(1, 400), 'day').toDate();
    const cliente = pick(clientes, f);
    const suc = pick(todasSucursales, f);
    const formaPago = pick(formasPago, f);
    const esCredito = formaPago === 'CREDITO';
    const estado = f % 50 === 3 ? 'ANULADA' : (esCredito ? (f % 3 === 0 ? 'PAGADA' : 'EMITIDA') : 'PAGADA');
    secActual += 1;
    const ncf = `E31${dayjs(fecha).format('YYYYMMDD')}${String(secActual).padStart(6, '0')}`;
    const numLineas = randInt(1, 5);
    let subtotal = 0;
    const detallesData: { productoId: string; descripcion: string; cantidad: number; precioUnitario: number; descuento: number; itbis: number; total: number; gravadoITBIS: boolean }[] = [];
    for (let l = 0; l < numLineas; l++) {
      const prod = pick(productos, f + l * 10);
      const cantidad = randInt(1, 20);
      const precioUnit = randInt(100, 5000);
      const descuento = randInt(0, 2) ? randInt(0, 500) : 0;
      const itbis = prod.gravadoITBIS ? (precioUnit * cantidad - descuento) * 0.18 : 0;
      const total = precioUnit * cantidad - descuento + itbis;
      subtotal += precioUnit * cantidad - descuento;
      detallesData.push({
        productoId: prod.id,
        descripcion: prod.nombre,
        cantidad,
        precioUnitario: precioUnit,
        descuento,
        itbis,
        total,
        gravadoITBIS: prod.gravadoITBIS,
      });
    }
    const descuentoTotal = randInt(0, 2) ? randInt(0, 500) : 0;
    const itbisTotal = subtotal * 0.18;
    const total = subtotal - descuentoTotal + itbisTotal;

    const factura = await prisma.factura.create({
      data: {
        numero: `FAC-${String(f + 1).padStart(6, '0')}`,
        ncf: estado !== 'ANULADA' ? ncf : null,
        tipoComprobante: 'B01',
        secuenciaNcfId: secB01.id,
        fecha,
        fechaVencimiento: esCredito ? dayjs(fecha).add(30, 'day').toDate() : null,
        clienteId: cliente.id,
        sucursalId: suc.id,
        subtotal: D(subtotal),
        descuento: D(descuentoTotal),
        itbis: D(itbisTotal),
        total: D(total),
        estado,
        formaPago,
        anulada: estado === 'ANULADA',
        motivoAnulacion: estado === 'ANULADA' ? 'Anulada en seed' : null,
        usuarioCreacion: usuarioAdmin.id,
      },
    });
    for (const d of detallesData) {
      await prisma.detalleFactura.create({
        data: {
          facturaId: factura.id,
          productoId: d.productoId,
          descripcion: d.descripcion,
          cantidad: D(d.cantidad),
          precioUnitario: D(d.precioUnitario),
          descuento: D(d.descuento),
          itbis: D(d.itbis),
          total: D(d.total),
          gravadoITBIS: d.gravadoITBIS,
        },
      });
    }
    if (esCredito && estado === 'EMITIDA') {
      const montoPagado = f % 2 === 0 ? randInt(0, Math.floor(total * 0.5)) : 0;
      await prisma.cuentaPorCobrar.create({
        data: {
          facturaId: factura.id,
          clienteId: cliente.id,
          montoTotal: D(total),
          montoPagado: D(montoPagado),
          saldoPendiente: D(total - montoPagado),
          fechaEmision: fecha,
          fechaVencimiento: dayjs(fecha).add(30, 'day').toDate(),
          estado: montoPagado >= total ? 'PAGADA' : montoPagado > 0 ? 'PAGADA_PARCIAL' : 'PENDIENTE',
          diasVencidos: dayjs(fecha).add(30, 'day').isBefore(dayjs()) ? dayjs().diff(dayjs(fecha).add(30, 'day'), 'day') : 0,
        },
      });
      if (montoPagado > 0) {
        await prisma.pagoFactura.create({
          data: {
            facturaId: factura.id,
            fecha: dayjs(fecha).add(randInt(1, 15), 'day').toDate(),
            monto: D(montoPagado),
            formaPago: 'TRANSFERENCIA',
            usuarioCreacion: usuarioAdmin.id,
          },
        });
      }
    }
  }
  await prisma.secuenciaNcf.update({
    where: { id: secB01.id },
    data: { secuenciaActual: secActual },
  });

  // --- Compras (150) y cuentas por pagar ---
  console.log('   Compras (150)...');
  for (let c = 0; c < 150; c++) {
    const fecha = dayjs().subtract(randInt(1, 350), 'day').toDate();
    const sup = pick(suplidores, c);
    const numLineas = randInt(1, 4);
    let subtotal = 0;
    const detallesCompra: { descripcion: string; cantidad: number; costoUnitario: number; descuento: number; itbis: number; total: number }[] = [];
    for (let l = 0; l < numLineas; l++) {
      const prod = pick(productos, c + l * 20);
      const cantidad = randInt(5, 100);
      const costo = randInt(50, 3000);
      const desc = randInt(0, 2) ? randInt(0, 200) : 0;
      const itbis = costo * cantidad * 0.18;
      const total = costo * cantidad - desc + itbis;
      subtotal += costo * cantidad - desc;
      detallesCompra.push({
        descripcion: prod.nombre,
        cantidad,
        costoUnitario: costo,
        descuento: desc,
        itbis,
        total,
      });
    }
    const descTotal = randInt(0, 1) ? randInt(0, 300) : 0;
    const itbisTotal = subtotal * 0.18;
    const total = subtotal - descTotal + itbisTotal;
    const estadoCompra = pick(['BORRADOR', 'REGISTRADA', 'ANULADA', 'PAGADA'], c);
    const compra = await prisma.compra.create({
      data: {
        numero: `COM-${String(c + 1).padStart(6, '0')}`,
        ncfSuplidor: `E32${dayjs(fecha).format('YYYYMMDD')}${String(c + 1).padStart(6, '0')}`,
        fecha,
        fechaVencimiento: dayjs(fecha).add(30, 'day').toDate(),
        suplidorId: sup.id,
        subtotal: D(subtotal),
        descuento: D(descTotal),
        itbis: D(itbisTotal),
        total: D(total),
        estado: estadoCompra,
        usuarioCreacion: usuarioAdmin.id,
      },
    });
    for (const d of detallesCompra) {
      await prisma.detalleCompra.create({
        data: {
          compraId: compra.id,
          descripcion: d.descripcion,
          cantidad: D(d.cantidad),
          costoUnitario: D(d.costoUnitario),
          descuento: D(d.descuento),
          itbis: D(d.itbis),
          total: D(d.total),
          gravadoITBIS: true,
        },
      });
    }
    if (estadoCompra === 'REGISTRADA' && c % 3 !== 0) {
      const montoPagado = c % 2 === 0 ? randInt(0, Math.floor(total * 0.6)) : 0;
      await prisma.cuentaPorPagar.create({
        data: {
          compraId: compra.id,
          suplidorId: sup.id,
          montoTotal: D(total),
          montoPagado: D(montoPagado),
          saldoPendiente: D(total - montoPagado),
          fechaEmision: fecha,
          fechaVencimiento: dayjs(fecha).add(30, 'day').toDate(),
          estado: montoPagado >= total ? 'PAGADA' : montoPagado > 0 ? 'PAGADA_PARCIAL' : 'PENDIENTE',
        },
      });
    }
  }

  // --- Movimientos inventario (entradas/salidas) ---
  console.log('   Movimientos inventario...');
  const facturasConDetalle = await prisma.factura.findMany({
    where: { anulada: false },
    include: { detalles: { where: { productoId: { not: null } } } },
    take: 300,
  });
  for (const fac of facturasConDetalle) {
    for (const det of fac.detalles) {
      if (!det.productoId) continue;
      const prod = await prisma.producto.findUnique({ where: { id: det.productoId } });
      if (!prod?.controlaInventario) continue;
      const cant = Number(det.cantidad);
      const costo = Number(prod.costoPromedio);
      await prisma.movimientoInventario.create({
        data: {
          productoId: det.productoId,
          tipo: 'SALIDA',
          tipoDocumento: 'VENTA',
          numeroDocumento: fac.numero,
          fecha: fac.fecha,
          cantidad: D(cant),
          costoUnitario: D(costo),
          costoTotal: D(cant * costo),
          stockAnterior: D(0),
          stockNuevo: D(-cant),
          usuarioCreacion: usuarioAdmin.id,
        },
      });
    }
  }
  const comprasConDetalle = await prisma.compra.findMany({
    where: { estado: { in: ['REGISTRADA', 'PAGADA'] } },
    include: { detalles: true },
    take: 120,
  });
  let compraLineIndex = 0;
  for (const com of comprasConDetalle) {
    for (const det of com.detalles) {
      const prod = productos[compraLineIndex % productos.length];
      compraLineIndex++;
      if (!prod.controlaInventario) continue;
      const cant = Number(det.cantidad);
      const costo = Number(det.costoUnitario);
      await prisma.movimientoInventario.create({
        data: {
          productoId: prod.id,
          tipo: 'ENTRADA',
          tipoDocumento: 'COMPRA',
          numeroDocumento: com.numero,
          fecha: com.fecha,
          cantidad: D(cant),
          costoUnitario: D(costo),
          costoTotal: D(cant * costo),
          stockAnterior: D(0),
          stockNuevo: D(cant),
          usuarioCreacion: usuarioAdmin.id,
        },
      });
    }
  }

  // --- Activos fijos (35) y depreciaciones ---
  console.log('   Activos fijos y depreciaciones...');
  for (let a = 0; a < 35; a++) {
    const fechaAdq = dayjs().subtract(randInt(6, 48), 'month').toDate();
    const valorAdq = D(randInt(15000, 800000));
    const vidaUtil = randInt(3, 10);
    const valorResidual = D(randInt(0, Number(valorAdq) * 0.1));
    const depreciacionAnual = (Number(valorAdq) - Number(valorResidual)) / vidaUtil;
    const activo = await prisma.activoFijo.create({
      data: {
        codigo: `AF-${String(a + 1).padStart(4, '0')}`,
        nombre: `${pick(TIPOS_ACTIVO_FIJO, a)} - ${a + 1}`,
        descripcion: `Activo fijo tipo ${pick(TIPOS_ACTIVO_FIJO, a)}`,
        fechaAdquisicion: fechaAdq,
        valorAdquisicion: valorAdq,
        valorResidual,
        vidaUtil,
        metodoDepreciacion: 'LINEA_RECTA',
        tasaDepreciacion: D(100 / vidaUtil),
        depreciacionAcumulada: D(0),
        valorNeto: valorAdq,
        estado: 'ACTIVO',
        activo: true,
      },
    });
    const mesesDesdeAdq = dayjs().diff(dayjs(fechaAdq), 'month');
    for (let mes = 0; mes < Math.min(mesesDesdeAdq, vidaUtil * 12); mes += randInt(1, 3)) {
      const periodoStr = dayjs(fechaAdq).add(mes, 'month').format('YYYY-MM');
      const antes = depreciacionAnual * (mes / 12);
      const despues = depreciacionAnual * ((mes + 1) / 12);
      await prisma.depreciacionActivo.create({
        data: {
          activoId: activo.id,
          periodo: periodoStr,
          fecha: dayjs(fechaAdq).add(mes + 1, 'month').toDate(),
          monto: D(depreciacionAnual / 12),
          depreciacionAcumuladaAntes: D(antes),
          depreciacionAcumuladaDespues: D(despues),
        },
      });
    }
  }

  // --- Asientos contables (por período) ---
  console.log('   Asientos contables...');
  const cuentas = await prisma.planCuentas.findMany({ where: { aceptaMovimiento: true }, take: 15 });
  const cuentaCaja = cuentas.find((c) => c.codigo.includes('1.1.1')) ?? cuentas[0];
  const cuentaVentas = cuentas.find((c) => c.codigo.includes('4.1')) ?? cuentas[0];
  for (const per of periodos) {
    const numAsientos = randInt(5, 18);
    for (let a = 0; a < numAsientos; a++) {
      const fecha = dayjs(per.fechaInicio).add(randInt(0, 28), 'day').toDate();
      const concepto = pick(CONCEPTOS_ASIENTO, a + per.anio * 100);
      const monto = D(randInt(5000, 150000));
      const asiento = await prisma.asientoContable.create({
        data: {
          numero: `ASI-${per.anio}${String(per.mes ?? 0).padStart(2, '0')}-${String(a + 1).padStart(4, '0')}`,
          fecha,
          tipo: a === 0 ? 'APERTURA' : (a === numAsientos - 1 && per.cerrado ? 'CIERRE' : 'DIARIO'),
          concepto,
          periodoId: per.id,
          debitos: monto,
          creditos: monto,
          esCuadrado: true,
          cerrado: per.cerrado,
          usuarioCreacion: usuarioAdmin.id,
        },
      });
      await prisma.detalleAsiento.create({
        data: {
          asientoId: asiento.id,
          cuentaId: cuentaCaja.id,
          descripcion: concepto,
          debito: monto,
          credito: D(0),
        },
      });
      await prisma.detalleAsiento.create({
        data: {
          asientoId: asiento.id,
          cuentaId: cuentaVentas.id,
          descripcion: concepto,
          debito: D(0),
          credito: monto,
        },
      });
    }
  }

  // --- Configuraciones ---
  console.log('   Configuraciones...');
  const configs = [
    { clave: 'itbis_tasa', valor: 18, modulo: 'FISCAL', descripcion: 'Tasa ITBIS general' },
    { clave: 'moneda', valor: 'DOP', modulo: 'GENERAL', descripcion: 'Moneda base' },
    { clave: 'factura_prefijo', valor: 'FAC', modulo: 'FACTURACION', descripcion: 'Prefijo número factura' },
    { clave: 'dias_vencimiento', valor: 30, modulo: 'FACTURACION', descripcion: 'Días vencimiento crédito' },
    { clave: 'backup_automatico', valor: true, modulo: 'SISTEMA', descripcion: 'Backup automático' },
  ];
  for (const cfg of configs) {
    await prisma.configuracion.upsert({
      where: { empresaId_modulo_clave: { empresaId: empresa.id, modulo: cfg.modulo, clave: cfg.clave } },
      update: {},
      create: {
        empresaId: empresa.id,
        clave: cfg.clave,
        valor: JSON.stringify(cfg.valor),
        modulo: cfg.modulo,
        descripcion: cfg.descripcion,
      },
    });
  }

  // --- Auditoría (muestra) ---
  console.log('   Auditoría (muestra)...');
  for (let i = 0; i < 80; i++) {
    await prisma.auditoria.create({
      data: {
        usuarioId: usuarioAdmin.id,
        accion: pick(['CREATE', 'UPDATE', 'DELETE', 'READ'], i),
        modulo: pick(['FACTURACION', 'INVENTARIO', 'CONTABILIDAD', 'CLIENTES', 'BANCOS'], i),
        tabla: pick(['facturas', 'clientes', 'productos', 'asientos_contables'], i),
        registroId: undefined,
        ipAddress: '127.0.0.1',
      },
    });
  }

  console.log('\n✅ Mock masivo completado.\n');

  // ============================================================================
  // RESUMEN FINAL
  // ============================================================================
  console.log('\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ SEED COMPLETADO EXITOSAMENTE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('📊 DATOS CREADOS (base + mock hiperrealista):');
  console.log('   ✓ Empresa, 4 sucursales');
  console.log('   ✓ 5 Roles, 3 Usuarios');
  console.log('   ✓ Plan de cuentas, 10 centros de costo');
  console.log('   ✓ 6 Secuencias NCF, 12 períodos');
  console.log('   ✓ 150 Clientes, 60 Suplidores');
  console.log('   ✓ 8 Categorías, 200 Productos');
  console.log('   ✓ 3 Cuentas bancarias, 80+ movimientos');
  console.log('   ✓ 420+ Facturas, detalles, cuentas por cobrar, pagos');
  console.log('   ✓ 150 Compras, cuentas por pagar');
  console.log('   ✓ Movimientos inventario (entradas/salidas)');
  console.log('   ✓ 35 Activos fijos con depreciaciones');
  console.log('   ✓ Asientos contables por período');
  console.log('   ✓ Configuraciones y 80 registros auditoría');
  console.log('');
  console.log('👤 CREDENCIALES: admin / admin123 | contador / contador123 | vendedor / vendedor123');
  console.log('⚠️  Cambiar contraseñas en producción');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
