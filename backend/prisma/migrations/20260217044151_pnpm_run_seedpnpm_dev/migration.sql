-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombreUsuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "rolId" TEXT NOT NULL,
    "sucursalId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "usuarios_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuarios_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "sucursales" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "permisos" JSONB NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "sesiones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiraEn" DATETIME NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sesiones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "auditorias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "tabla" TEXT NOT NULL,
    "registroId" TEXT,
    "datosAntes" JSONB,
    "datosDespues" JSONB,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "auditorias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rnc" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "nombreComercial" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT,
    "direccion" TEXT,
    "ciudad" TEXT,
    "provincia" TEXT,
    "pais" TEXT NOT NULL DEFAULT 'República Dominicana',
    "sitioWeb" TEXT,
    "logo" TEXT,
    "contribuyenteITBIS" BOOLEAN NOT NULL DEFAULT true,
    "regimenEspecial" BOOLEAN NOT NULL DEFAULT false,
    "tipoContribuyente" TEXT NOT NULL,
    "planContableId" TEXT,
    "monedaBase" TEXT NOT NULL DEFAULT 'DOP',
    "separadorMiles" TEXT NOT NULL DEFAULT ',',
    "separadorDecimal" TEXT NOT NULL DEFAULT '.',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "sucursales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "esPrincipal" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sucursales_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "configuraciones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "valor" JSONB NOT NULL,
    "modulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "configuraciones_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "plan_cuentas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "tipoCuenta" TEXT NOT NULL,
    "naturaleza" TEXT NOT NULL,
    "cuentaPadreId" TEXT,
    "aceptaMovimiento" BOOLEAN NOT NULL DEFAULT true,
    "requiereCentroCosto" BOOLEAN NOT NULL DEFAULT false,
    "requiereTercero" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "plan_cuentas_cuentaPadreId_fkey" FOREIGN KEY ("cuentaPadreId") REFERENCES "plan_cuentas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "asientos_contables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "periodoId" TEXT NOT NULL,
    "documentoReferencia" TEXT,
    "moduloOrigen" TEXT,
    "debitos" DECIMAL NOT NULL,
    "creditos" DECIMAL NOT NULL,
    "esCuadrado" BOOLEAN NOT NULL DEFAULT false,
    "cerrado" BOOLEAN NOT NULL DEFAULT false,
    "fechaCierre" DATETIME,
    "usuarioCreacion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "asientos_contables_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "periodos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "detalles_asiento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "asientoId" TEXT NOT NULL,
    "cuentaId" TEXT NOT NULL,
    "centroCostoId" TEXT,
    "terceroId" TEXT,
    "descripcion" TEXT NOT NULL,
    "debito" DECIMAL NOT NULL DEFAULT 0,
    "credito" DECIMAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "detalles_asiento_asientoId_fkey" FOREIGN KEY ("asientoId") REFERENCES "asientos_contables" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "detalles_asiento_cuentaId_fkey" FOREIGN KEY ("cuentaId") REFERENCES "plan_cuentas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "detalles_asiento_centroCostoId_fkey" FOREIGN KEY ("centroCostoId") REFERENCES "centros_costo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "centros_costo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "periodos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cerrado" BOOLEAN NOT NULL DEFAULT false,
    "fechaCierre" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipoIdentificacion" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "razonSocial" TEXT,
    "nombre" TEXT,
    "apellido" TEXT,
    "nombreComercial" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "celular" TEXT,
    "direccion" TEXT,
    "ciudad" TEXT,
    "provincia" TEXT,
    "pais" TEXT NOT NULL DEFAULT 'República Dominicana',
    "tipoCliente" TEXT NOT NULL,
    "limiteCredito" DECIMAL,
    "plazoCredito" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "secuencias_ncf" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipoComprobante" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "secuenciaInicio" INTEGER NOT NULL,
    "secuenciaFin" INTEGER NOT NULL,
    "secuenciaActual" INTEGER NOT NULL,
    "fechaVencimiento" DATETIME NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "ncf" TEXT,
    "tipoComprobante" TEXT NOT NULL,
    "secuenciaNcfId" TEXT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaVencimiento" DATETIME,
    "clienteId" TEXT NOT NULL,
    "sucursalId" TEXT NOT NULL,
    "subtotal" DECIMAL NOT NULL,
    "descuento" DECIMAL NOT NULL DEFAULT 0,
    "itbis" DECIMAL NOT NULL DEFAULT 0,
    "total" DECIMAL NOT NULL,
    "estado" TEXT NOT NULL,
    "formaPago" TEXT NOT NULL,
    "notas" TEXT,
    "anulada" BOOLEAN NOT NULL DEFAULT false,
    "motivoAnulacion" TEXT,
    "usuarioCreacion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "facturas_secuenciaNcfId_fkey" FOREIGN KEY ("secuenciaNcfId") REFERENCES "secuencias_ncf" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "facturas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "facturas_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "sucursales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "detalles_factura" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "facturaId" TEXT NOT NULL,
    "productoId" TEXT,
    "descripcion" TEXT NOT NULL,
    "cantidad" DECIMAL NOT NULL,
    "precioUnitario" DECIMAL NOT NULL,
    "descuento" DECIMAL NOT NULL DEFAULT 0,
    "itbis" DECIMAL NOT NULL DEFAULT 0,
    "total" DECIMAL NOT NULL,
    "gravadoITBIS" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "detalles_factura_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "facturas" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "detalles_factura_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "productos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoriaId" TEXT,
    "tipoProducto" TEXT NOT NULL,
    "unidadMedida" TEXT NOT NULL,
    "controlaInventario" BOOLEAN NOT NULL DEFAULT true,
    "stockMinimo" DECIMAL,
    "stockMaximo" DECIMAL,
    "costoPromedio" DECIMAL NOT NULL DEFAULT 0,
    "precioVenta" DECIMAL NOT NULL,
    "gravadoITBIS" BOOLEAN NOT NULL DEFAULT true,
    "porcentajeITBIS" DECIMAL NOT NULL DEFAULT 18,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_producto" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categorias_producto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "movimientos_inventario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productoId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cantidad" DECIMAL NOT NULL,
    "costoUnitario" DECIMAL NOT NULL,
    "costoTotal" DECIMAL NOT NULL,
    "stockAnterior" DECIMAL NOT NULL,
    "stockNuevo" DECIMAL NOT NULL,
    "observaciones" TEXT,
    "usuarioCreacion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "movimientos_inventario_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cuentas_por_cobrar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "facturaId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "montoTotal" DECIMAL NOT NULL,
    "montoPagado" DECIMAL NOT NULL DEFAULT 0,
    "saldoPendiente" DECIMAL NOT NULL,
    "fechaEmision" DATETIME NOT NULL,
    "fechaVencimiento" DATETIME NOT NULL,
    "estado" TEXT NOT NULL,
    "diasVencidos" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cuentas_por_cobrar_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "facturas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cuentas_por_cobrar_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pagos_factura" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "facturaId" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monto" DECIMAL NOT NULL,
    "formaPago" TEXT NOT NULL,
    "numeroReferencia" TEXT,
    "bancoId" TEXT,
    "observaciones" TEXT,
    "usuarioCreacion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pagos_factura_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "facturas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "suplidores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipoIdentificacion" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "razonSocial" TEXT,
    "nombre" TEXT,
    "apellido" TEXT,
    "nombreComercial" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "direccion" TEXT,
    "ciudad" TEXT,
    "provincia" TEXT,
    "tipoSuplidor" TEXT NOT NULL,
    "plazoCredito" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "compras" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "ncfSuplidor" TEXT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaVencimiento" DATETIME,
    "suplidorId" TEXT NOT NULL,
    "subtotal" DECIMAL NOT NULL,
    "descuento" DECIMAL NOT NULL DEFAULT 0,
    "itbis" DECIMAL NOT NULL DEFAULT 0,
    "total" DECIMAL NOT NULL,
    "estado" TEXT NOT NULL,
    "notas" TEXT,
    "usuarioCreacion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "compras_suplidorId_fkey" FOREIGN KEY ("suplidorId") REFERENCES "suplidores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "detalles_compra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "compraId" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cantidad" DECIMAL NOT NULL,
    "costoUnitario" DECIMAL NOT NULL,
    "descuento" DECIMAL NOT NULL DEFAULT 0,
    "itbis" DECIMAL NOT NULL DEFAULT 0,
    "total" DECIMAL NOT NULL,
    "gravadoITBIS" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "detalles_compra_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "compras" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cuentas_por_pagar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "compraId" TEXT NOT NULL,
    "suplidorId" TEXT NOT NULL,
    "montoTotal" DECIMAL NOT NULL,
    "montoPagado" DECIMAL NOT NULL DEFAULT 0,
    "saldoPendiente" DECIMAL NOT NULL,
    "fechaEmision" DATETIME NOT NULL,
    "fechaVencimiento" DATETIME NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cuentas_por_pagar_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "compras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cuentas_por_pagar_suplidorId_fkey" FOREIGN KEY ("suplidorId") REFERENCES "suplidores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "activos_fijos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoriaId" TEXT,
    "fechaAdquisicion" DATETIME NOT NULL,
    "valorAdquisicion" DECIMAL NOT NULL,
    "valorResidual" DECIMAL NOT NULL DEFAULT 0,
    "vidaUtil" INTEGER NOT NULL,
    "metodoDepreciacion" TEXT NOT NULL,
    "tasaDepreciacion" DECIMAL NOT NULL,
    "depreciacionAcumulada" DECIMAL NOT NULL DEFAULT 0,
    "valorNeto" DECIMAL NOT NULL,
    "estado" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "depreciaciones_activo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "activoId" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "monto" DECIMAL NOT NULL,
    "depreciacionAcumuladaAntes" DECIMAL NOT NULL,
    "depreciacionAcumuladaDespues" DECIMAL NOT NULL,
    "asientoId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "depreciaciones_activo_activoId_fkey" FOREIGN KEY ("activoId") REFERENCES "activos_fijos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cuentas_bancarias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "banco" TEXT NOT NULL,
    "numeroCuenta" TEXT NOT NULL,
    "tipoCuenta" TEXT NOT NULL,
    "moneda" TEXT NOT NULL DEFAULT 'DOP',
    "saldoInicial" DECIMAL NOT NULL,
    "saldoActual" DECIMAL NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "movimientos_bancarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cuentaBancariaId" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL,
    "numeroDocumento" TEXT,
    "concepto" TEXT NOT NULL,
    "monto" DECIMAL NOT NULL,
    "saldoAnterior" DECIMAL NOT NULL,
    "saldoNuevo" DECIMAL NOT NULL,
    "conciliado" BOOLEAN NOT NULL DEFAULT false,
    "fechaConciliacion" DATETIME,
    "usuarioCreacion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "movimientos_bancarios_cuentaBancariaId_fkey" FOREIGN KEY ("cuentaBancariaId") REFERENCES "cuentas_bancarias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nombreUsuario_key" ON "usuarios"("nombreUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_key" ON "roles"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "sesiones_token_key" ON "sesiones"("token");

-- CreateIndex
CREATE INDEX "auditorias_usuarioId_createdAt_idx" ON "auditorias"("usuarioId", "createdAt");

-- CreateIndex
CREATE INDEX "auditorias_modulo_tabla_idx" ON "auditorias"("modulo", "tabla");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_rnc_key" ON "empresas"("rnc");

-- CreateIndex
CREATE UNIQUE INDEX "sucursales_empresaId_codigo_key" ON "sucursales"("empresaId", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "configuraciones_empresaId_modulo_clave_key" ON "configuraciones"("empresaId", "modulo", "clave");

-- CreateIndex
CREATE UNIQUE INDEX "plan_cuentas_codigo_key" ON "plan_cuentas"("codigo");

-- CreateIndex
CREATE INDEX "plan_cuentas_codigo_idx" ON "plan_cuentas"("codigo");

-- CreateIndex
CREATE INDEX "plan_cuentas_tipoCuenta_idx" ON "plan_cuentas"("tipoCuenta");

-- CreateIndex
CREATE UNIQUE INDEX "asientos_contables_numero_key" ON "asientos_contables"("numero");

-- CreateIndex
CREATE INDEX "asientos_contables_fecha_idx" ON "asientos_contables"("fecha");

-- CreateIndex
CREATE INDEX "asientos_contables_periodoId_idx" ON "asientos_contables"("periodoId");

-- CreateIndex
CREATE INDEX "detalles_asiento_cuentaId_idx" ON "detalles_asiento"("cuentaId");

-- CreateIndex
CREATE UNIQUE INDEX "centros_costo_codigo_key" ON "centros_costo"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "periodos_anio_mes_key" ON "periodos"("anio", "mes");

-- CreateIndex
CREATE INDEX "clientes_identificacion_idx" ON "clientes"("identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_tipoIdentificacion_identificacion_key" ON "clientes"("tipoIdentificacion", "identificacion");

-- CreateIndex
CREATE INDEX "secuencias_ncf_tipoComprobante_activo_idx" ON "secuencias_ncf"("tipoComprobante", "activo");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_numero_key" ON "facturas"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_ncf_key" ON "facturas"("ncf");

-- CreateIndex
CREATE INDEX "facturas_fecha_idx" ON "facturas"("fecha");

-- CreateIndex
CREATE INDEX "facturas_clienteId_idx" ON "facturas"("clienteId");

-- CreateIndex
CREATE INDEX "facturas_ncf_idx" ON "facturas"("ncf");

-- CreateIndex
CREATE UNIQUE INDEX "productos_codigo_key" ON "productos"("codigo");

-- CreateIndex
CREATE INDEX "productos_codigo_idx" ON "productos"("codigo");

-- CreateIndex
CREATE INDEX "productos_nombre_idx" ON "productos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_producto_codigo_key" ON "categorias_producto"("codigo");

-- CreateIndex
CREATE INDEX "movimientos_inventario_productoId_fecha_idx" ON "movimientos_inventario"("productoId", "fecha");

-- CreateIndex
CREATE UNIQUE INDEX "cuentas_por_cobrar_facturaId_key" ON "cuentas_por_cobrar"("facturaId");

-- CreateIndex
CREATE INDEX "cuentas_por_cobrar_clienteId_estado_idx" ON "cuentas_por_cobrar"("clienteId", "estado");

-- CreateIndex
CREATE INDEX "cuentas_por_cobrar_fechaVencimiento_idx" ON "cuentas_por_cobrar"("fechaVencimiento");

-- CreateIndex
CREATE INDEX "pagos_factura_facturaId_idx" ON "pagos_factura"("facturaId");

-- CreateIndex
CREATE UNIQUE INDEX "suplidores_tipoIdentificacion_identificacion_key" ON "suplidores"("tipoIdentificacion", "identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "compras_numero_key" ON "compras"("numero");

-- CreateIndex
CREATE INDEX "compras_fecha_idx" ON "compras"("fecha");

-- CreateIndex
CREATE INDEX "compras_suplidorId_idx" ON "compras"("suplidorId");

-- CreateIndex
CREATE UNIQUE INDEX "cuentas_por_pagar_compraId_key" ON "cuentas_por_pagar"("compraId");

-- CreateIndex
CREATE INDEX "cuentas_por_pagar_suplidorId_estado_idx" ON "cuentas_por_pagar"("suplidorId", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "activos_fijos_codigo_key" ON "activos_fijos"("codigo");

-- CreateIndex
CREATE INDEX "depreciaciones_activo_activoId_periodo_idx" ON "depreciaciones_activo"("activoId", "periodo");

-- CreateIndex
CREATE INDEX "movimientos_bancarios_cuentaBancariaId_fecha_idx" ON "movimientos_bancarios"("cuentaBancariaId", "fecha");
