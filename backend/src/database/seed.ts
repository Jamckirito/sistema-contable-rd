import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

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
      permisos: ['*'], // Wildcard - todos los permisos
      activo: true
    }
  });

  const rolContador = await prisma.rol.upsert({
    where: { nombre: 'Contador' },
    update: {},
    create: {
      nombre: 'Contador',
      descripcion: 'Acceso a contabilidad, reportes y consultas',
      permisos: [
        'contabilidad:*',
        'reportes:*',
        'facturas:ver',
        'clientes:ver',
        'suplidores:ver',
        'inventario:ver',
        'bancos:ver'
      ],
      activo: true
    }
  });

  const rolVendedor = await prisma.rol.upsert({
    where: { nombre: 'Vendedor' },
    update: {},
    create: {
      nombre: 'Vendedor',
      descripcion: 'Acceso a facturación y gestión de clientes',
      permisos: [
        'facturas:crear',
        'facturas:ver',
        'clientes:*',
        'inventario:ver',
        'reportes:ver'
      ],
      activo: true
    }
  });

  const rolAlmacenista = await prisma.rol.upsert({
    where: { nombre: 'Almacenista' },
    update: {},
    create: {
      nombre: 'Almacenista',
      descripcion: 'Acceso a gestión de inventario',
      permisos: [
        'inventario:*',
        'productos:*',
        'compras:ver'
      ],
      activo: true
    }
  });

  const rolConsulta = await prisma.rol.upsert({
    where: { nombre: 'Consulta' },
    update: {},
    create: {
      nombre: 'Consulta',
      descripcion: 'Solo lectura - Sin permisos de modificación',
      permisos: [
        'facturas:ver',
        'clientes:ver',
        'inventario:ver',
        'reportes:ver',
        'contabilidad:ver'
      ],
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

  // Nivel 2 - Subcuentas principales
  await prisma.planCuentas.createMany({
    skipDuplicates: true,
    data: [
      // Activos
      { codigo: '1.1', nombre: 'ACTIVOS CORRIENTES', nivel: 2, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activos.id, aceptaMovimiento: false },
      { codigo: '1.2', nombre: 'ACTIVOS FIJOS', nivel: 2, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activos.id, aceptaMovimiento: false },
      
      // Pasivos
      { codigo: '2.1', nombre: 'PASIVOS CORRIENTES', nivel: 2, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivos.id, aceptaMovimiento: false },
      { codigo: '2.2', nombre: 'PASIVOS A LARGO PLAZO', nivel: 2, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivos.id, aceptaMovimiento: false },
      
      // Patrimonio
      { codigo: '3.1', nombre: 'CAPITAL SOCIAL', nivel: 2, tipoCuenta: 'PATRIMONIO', naturaleza: 'ACREEDORA', cuentaPadreId: patrimonio.id, aceptaMovimiento: false },
      { codigo: '3.2', nombre: 'UTILIDADES RETENIDAS', nivel: 2, tipoCuenta: 'PATRIMONIO', naturaleza: 'ACREEDORA', cuentaPadreId: patrimonio.id, aceptaMovimiento: false },
      
      // Ingresos
      { codigo: '4.1', nombre: 'INGRESOS OPERACIONALES', nivel: 2, tipoCuenta: 'INGRESO', naturaleza: 'ACREEDORA', cuentaPadreId: ingresos.id, aceptaMovimiento: false },
      
      // Gastos
      { codigo: '5.1', nombre: 'GASTOS OPERACIONALES', nivel: 2, tipoCuenta: 'GASTO', naturaleza: 'DEUDORA', cuentaPadreId: gastos.id, aceptaMovimiento: false },
    ]
  });

  // Obtener las cuentas de nivel 2 para crear nivel 3
  const activosCorrientes = await prisma.planCuentas.findUnique({ where: { codigo: '1.1' } });
  const pasivosCorrientes = await prisma.planCuentas.findUnique({ where: { codigo: '2.1' } });
  const ingresosOp = await prisma.planCuentas.findUnique({ where: { codigo: '4.1' } });

  // Nivel 3 - Cuentas de detalle (algunas aceptan movimiento)
  await prisma.planCuentas.createMany({
    skipDuplicates: true,
    data: [
      // Activos Corrientes
      { codigo: '1.1.1', nombre: 'CAJA Y BANCOS', nivel: 3, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activosCorrientes!.id, aceptaMovimiento: false },
      { codigo: '1.1.2', nombre: 'CUENTAS POR COBRAR', nivel: 3, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activosCorrientes!.id, aceptaMovimiento: true },
      { codigo: '1.1.3', nombre: 'INVENTARIOS', nivel: 3, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: activosCorrientes!.id, aceptaMovimiento: true },
      
      // Pasivos Corrientes
      { codigo: '2.1.1', nombre: 'CUENTAS POR PAGAR', nivel: 3, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivosCorrientes!.id, aceptaMovimiento: true },
      { codigo: '2.1.2', nombre: 'ITBIS POR PAGAR', nivel: 3, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivosCorrientes!.id, aceptaMovimiento: true },
      { codigo: '2.1.3', nombre: 'ISR POR PAGAR', nivel: 3, tipoCuenta: 'PASIVO', naturaleza: 'ACREEDORA', cuentaPadreId: pasivosCorrientes!.id, aceptaMovimiento: true },
      
      // Ingresos
      { codigo: '4.1.1', nombre: 'VENTAS', nivel: 3, tipoCuenta: 'INGRESO', naturaleza: 'ACREEDORA', cuentaPadreId: ingresosOp!.id, aceptaMovimiento: true },
    ]
  });

  const cajaYBancos = await prisma.planCuentas.findUnique({ where: { codigo: '1.1.1' } });

  // Nivel 4 - Cuentas específicas que aceptan movimiento
  await prisma.planCuentas.createMany({
    skipDuplicates: true,
    data: [
      { codigo: '1.1.1.1', nombre: 'CAJA GENERAL', nivel: 4, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: cajaYBancos!.id, aceptaMovimiento: true },
      { codigo: '1.1.1.2', nombre: 'BANCO POPULAR', nivel: 4, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: cajaYBancos!.id, aceptaMovimiento: true },
      { codigo: '1.1.1.3', nombre: 'BANCO BHD', nivel: 4, tipoCuenta: 'ACTIVO', naturaleza: 'DEUDORA', cuentaPadreId: cajaYBancos!.id, aceptaMovimiento: true },
    ]
  });

  console.log(`✅ Plan de cuentas básico creado`);

  // ============================================================================
  // 6. CREAR SECUENCIAS NCF
  // ============================================================================
  console.log('📝 Creando secuencias NCF...');

  const fechaVencimiento = dayjs().add(1, 'year').toDate();

  await prisma.secuenciaNcf.createMany({
    skipDuplicates: true,
    data: [
      {
        tipoComprobante: 'B01',
        serie: '001',
        secuenciaInicio: 1,
        secuenciaFin: 100000,
        secuenciaActual: 0,
        fechaVencimiento,
        activo: true
      },
      {
        tipoComprobante: 'B02',
        serie: '001',
        secuenciaInicio: 1,
        secuenciaFin: 100000,
        secuenciaActual: 0,
        fechaVencimiento,
        activo: true
      },
      {
        tipoComprobante: 'B03',
        serie: '001',
        secuenciaInicio: 1,
        secuenciaFin: 50000,
        secuenciaActual: 0,
        fechaVencimiento,
        activo: true
      },
      {
        tipoComprobante: 'B04',
        serie: '001',
        secuenciaInicio: 1,
        secuenciaFin: 50000,
        secuenciaActual: 0,
        fechaVencimiento,
        activo: true
      },
      {
        tipoComprobante: 'B14',
        serie: '001',
        secuenciaInicio: 1,
        secuenciaFin: 10000,
        secuenciaActual: 0,
        fechaVencimiento,
        activo: true
      },
      {
        tipoComprobante: 'B15',
        serie: '001',
        secuenciaInicio: 1,
        secuenciaFin: 10000,
        secuenciaActual: 0,
        fechaVencimiento,
        activo: true
      }
    ]
  });

  console.log(`✅ Secuencias NCF creadas para todos los tipos`);

  // ============================================================================
  // 7. CREAR PERÍODOS CONTABLES
  // ============================================================================
  console.log('📅 Creando períodos contables...');

  const añoActual = dayjs().year();
  
  for (let mes = 1; mes <= 12; mes++) {
    await prisma.periodo.upsert({
      where: {
        año_mes: {
          año: añoActual,
          mes
        }
      },
      update: {},
      create: {
        año: añoActual,
        mes,
        fechaInicio: dayjs(`${añoActual}-${mes}-01`).toDate(),
        fechaFin: dayjs(`${añoActual}-${mes}-01`).endOf('month').toDate(),
        descripcion: `${añoActual}-${mes.toString().padStart(2, '0')}`,
        cerrado: mes < dayjs().month() + 1 // Cerrar meses anteriores
      }
    });
  }

  console.log(`✅ Períodos contables creados para ${añoActual}`);

  // ============================================================================
  // 8. CREAR CATEGORÍAS DE PRODUCTOS
  // ============================================================================
  console.log('📦 Creando categorías de productos...');

  await prisma.categoriaProducto.createMany({
    skipDuplicates: true,
    data: [
      { codigo: 'CAT001', nombre: 'Productos', descripcion: 'Productos generales', activo: true },
      { codigo: 'CAT002', nombre: 'Servicios', descripcion: 'Servicios profesionales', activo: true },
      { codigo: 'CAT003', nombre: 'Materias Primas', descripcion: 'Insumos y materias primas', activo: true },
    ]
  });

  console.log(`✅ Categorías de productos creadas`);

  // ============================================================================
  // 9. CREAR CUENTA BANCARIA DE EJEMPLO
  // ============================================================================
  console.log('🏦 Creando cuenta bancaria...');

  await prisma.cuentaBancaria.create({
    data: {
      banco: 'Banco Popular Dominicano',
      numeroCuenta: '0000000000',
      tipoCuenta: 'CORRIENTE',
      moneda: 'DOP',
      saldoInicial: 0,
      saldoActual: 0,
      activo: true
    }
  }).catch(() => console.log('   ℹ️  Cuenta bancaria ya existe'));

  console.log(`✅ Cuenta bancaria creada`);

  // ============================================================================
  // RESUMEN FINAL
  // ============================================================================
  console.log('\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ SEED COMPLETADO EXITOSAMENTE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('📊 DATOS CREADOS:');
  console.log('   ✓ Empresa y sucursal');
  console.log('   ✓ 5 Roles de usuario');
  console.log('   ✓ 3 Usuarios (admin, contador, vendedor)');
  console.log('   ✓ Plan de cuentas básico (20+ cuentas)');
  console.log('   ✓ 6 Secuencias NCF (B01-B15)');
  console.log('   ✓ 12 Períodos contables');
  console.log('   ✓ Categorías de productos');
  console.log('   ✓ Cuenta bancaria inicial');
  console.log('');
  console.log('👤 CREDENCIALES DE ACCESO:');
  console.log('');
  console.log('   🔑 ADMINISTRADOR:');
  console.log('      Usuario: admin');
  console.log('      Contraseña: admin123');
  console.log('');
  console.log('   🔑 CONTADOR:');
  console.log('      Usuario: contador');
  console.log('      Contraseña: contador123');
  console.log('');
  console.log('   🔑 VENDEDOR:');
  console.log('      Usuario: vendedor');
  console.log('      Contraseña: vendedor123');
  console.log('');
  console.log('⚠️  IMPORTANTE: Cambiar todas las contraseñas en producción');
  console.log('');
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
