# Guía de Implementación Completa - Sistema Contable RD

## 📁 Estructura Completa del Proyecto

El sistema está diseñado con una arquitectura modular que separa claramente el backend (API REST) del frontend (React SPA).

### Backend - Estructura de Archivos

```
backend/
├── src/
│   ├── modules/                    # Módulos de negocio
│   │   ├── auth/                   # Autenticación y autorización
│   │   │   ├── auth.service.ts     # ✅ CREADO - Lógica de autenticación
│   │   │   ├── auth.controller.ts  # ✅ CREADO - Controladores HTTP
│   │   │   └── auth.routes.ts      # ✅ CREADO - Rutas Express
│   │   │
│   │   ├── facturacion/            # Facturación electrónica
│   │   │   ├── facturacion.service.ts     # ✅ CREADO - Lógica de facturación
│   │   │   ├── facturacion.controller.ts  # ✅ CREADO - Controladores
│   │   │   └── facturacion.routes.ts      # ✅ CREADO - Rutas
│   │   │
│   │   ├── contabilidad/           # Contabilidad general
│   │   │   ├── contabilidad.service.ts
│   │   │   ├── contabilidad.controller.ts
│   │   │   └── contabilidad.routes.ts     # ✅ CREADO (placeholder)
│   │   │
│   │   ├── inventario/             # Gestión de inventario
│   │   ├── clientes/               # Gestión de clientes
│   │   ├── itbis/                  # Manejo de ITBIS
│   │   ├── bancos/                 # Conciliación bancaria
│   │   ├── nomina/                 # Nómina (opcional)
│   │   ├── activos-fijos/          # Activos fijos
│   │   └── reportes/               # Generación de reportes
│   │
│   ├── shared/                     # Código compartido
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts  # ✅ CREADO - Middleware JWT
│   │   │   └── error.middleware.ts # ✅ CREADO - Manejo de errores
│   │   │
│   │   └── utils/
│   │       ├── logger.ts           # ✅ CREADO - Logger Winston
│   │       ├── validators.ts       # Validadores Zod
│   │       └── formatters.ts       # Formateadores
│   │
│   ├── database/
│   │   ├── prisma.client.ts        # ✅ CREADO - Cliente Prisma
│   │   └── seed.ts                 # Script de sembrado
│   │
│   └── server.ts                   # ✅ CREADO - Servidor Express
│
├── prisma/
│   └── schema.prisma               # ✅ CREADO - Esquema completo de BD
│
├── package.json                    # ✅ CREADO - Dependencias backend
├── tsconfig.json                   # ✅ CREADO - Config TypeScript
└── .env.example                    # ✅ CREADO - Variables de entorno
```

### Frontend - Estructura de Archivos

```
frontend/
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx      # 🔨 POR IMPLEMENTAR
│   │   │   └── AuthLayout.tsx      # 🔨 POR IMPLEMENTAR
│   │   │
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   └── modules/
│   │       ├── facturacion/
│   │       ├── clientes/
│   │       └── inventario/
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Login.tsx           # 🔨 POR IMPLEMENTAR
│   │   ├── Dashboard.tsx           # 🔨 POR IMPLEMENTAR
│   │   ├── facturacion/
│   │   │   ├── Facturas.tsx
│   │   │   └── NuevaFactura.tsx
│   │   ├── clientes/
│   │   ├── inventario/
│   │   ├── contabilidad/
│   │   └── reportes/
│   │
│   ├── services/
│   │   ├── api.ts                  # ✅ CREADO - Cliente axios
│   │   ├── auth.service.ts         # 🔨 POR IMPLEMENTAR
│   │   ├── facturacion.service.ts  # 🔨 POR IMPLEMENTAR
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFacturas.ts
│   │   └── ...
│   │
│   ├── store/
│   │   ├── authStore.ts            # ✅ CREADO - Store Zustand
│   │   └── uiStore.ts
│   │
│   ├── types/
│   │   ├── factura.ts
│   │   ├── cliente.ts
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   │
│   ├── App.tsx                     # ✅ CREADO - App principal
│   └── main.tsx                    # 🔨 POR CREAR - Entry point
│
├── package.json                    # ✅ CREADO - Dependencias frontend
├── tsconfig.json                   # ✅ CREADO - Config TypeScript
├── vite.config.ts                  # ✅ CREADO - Config Vite
└── tailwind.config.js              # ✅ CREADO - Config Tailwind
```

## 🚀 Pasos para Completar la Implementación

### 1. Completar Módulos del Backend

Cada módulo debe seguir esta estructura:

#### Ejemplo: Módulo de Clientes

```typescript
// clientes.service.ts
export class ClientesService {
  async crear(data: CrearClienteDTO) {
    // Validar RNC/Cédula
    // Crear cliente en BD
    // Retornar cliente creado
  }

  async listar(filtros?: any) {
    // Aplicar filtros
    // Retornar lista paginada
  }

  async obtener(id: string) {
    // Buscar por ID
    // Incluir relaciones necesarias
  }

  async actualizar(id: string, data: ActualizarClienteDTO) {
    // Validar datos
    // Actualizar en BD
  }

  async eliminar(id: string) {
    // Soft delete (activo = false)
  }
}
```

#### Módulos Prioritarios a Implementar

1. **Clientes** (Alta prioridad)
   - CRUD completo
   - Validación de RNC/Cédula
   - Gestión de límite de crédito

2. **Inventario** (Alta prioridad)
   - CRUD de productos
   - Movimientos de inventario
   - Cálculo de costo promedio

3. **ITBIS** (Alta prioridad)
   - Generación reportes 606/607
   - Exportación a XML
   - Validación de NCF

4. **Contabilidad** (Media prioridad)
   - Asientos contables
   - Libros mayores
   - Balance de comprobación

5. **Bancos** (Media prioridad)
   - Movimientos bancarios
   - Conciliación bancaria

6. **Reportes** (Alta prioridad)
   - Estados financieros
   - Reportes fiscales
   - Exportación PDF/Excel

### 2. Completar Frontend

#### Componentes Comunes a Crear

```typescript
// components/common/Button.tsx
export const Button = ({ children, variant, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

// components/common/Table.tsx
export const Table = ({ columns, data, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} onClick={() => onRowClick?.(row)} className="hover:bg-gray-50 cursor-pointer">
              {columns.map(col => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

#### Páginas Principales a Implementar

1. **Dashboard** - Vista general con KPIs
2. **Login** - Autenticación
3. **Facturas** - Lista y gestión
4. **Nueva Factura** - Formulario de creación
5. **Clientes** - CRUD clientes
6. **Inventario** - Gestión de productos
7. **Reportes** - Visualización de reportes

### 3. Implementar Funcionalidades DGII

#### Generación de Reportes 606/607 (XML)

```typescript
// modules/itbis/itbis.service.ts
export class ITBISService {
  async generarReporte606(mes: number, año: number) {
    // Obtener todas las compras del período
    const compras = await prisma.compra.findMany({
      where: {
        fecha: {
          gte: new Date(año, mes - 1, 1),
          lt: new Date(año, mes, 1)
        }
      },
      include: { suplidor: true }
    });

    // Generar XML según formato DGII
    const xml = this.generarXML606(compras);
    
    return xml;
  }

  private generarXML606(compras: any[]) {
    // Implementar generación XML según especificaciones DGII
    // Formato: https://dgii.gov.do/legislacion/formatos/Paginas/default.aspx
  }

  async generarReporte607(mes: number, año: number) {
    // Similar para ventas
  }
}
```

### 4. Implementar Sistema de Permisos

```typescript
// Ejemplo de permisos granulares
const PERMISOS = {
  // Facturación
  'facturas:crear': 'Crear facturas',
  'facturas:ver': 'Ver facturas',
  'facturas:editar': 'Editar facturas',
  'facturas:anular': 'Anular facturas',
  'facturas:pagar': 'Registrar pagos',
  
  // Contabilidad
  'contabilidad:ver': 'Ver movimientos contables',
  'contabilidad:crear': 'Crear asientos',
  'contabilidad:cerrar_periodo': 'Cerrar períodos',
  
  // Reportes
  'reportes:ver': 'Ver reportes',
  'reportes:exportar': 'Exportar reportes',
  
  // Administración
  'admin:usuarios': 'Gestionar usuarios',
  'admin:configuracion': 'Configurar sistema',
  
  // Wildcard
  '*': 'Acceso total'
};
```

### 5. Seeds para Datos Iniciales

```typescript
// database/seed.ts
import { prisma } from './prisma.client';
import bcrypt from 'bcrypt';

async function seed() {
  // 1. Crear empresa
  const empresa = await prisma.empresa.create({
    data: {
      rnc: '000000000',
      razonSocial: 'Mi Empresa SRL',
      nombreComercial: 'Mi Empresa',
      contribuyenteITBIS: true,
      tipoContribuyente: 'PERSONA_JURIDICA',
      monedaBase: 'DOP'
    }
  });

  // 2. Crear rol administrador
  const rolAdmin = await prisma.rol.create({
    data: {
      nombre: 'Administrador',
      descripcion: 'Acceso total al sistema',
      permisos: ['*'],
      activo: true
    }
  });

  // 3. Crear usuario admin
  await prisma.usuario.create({
    data: {
      nombreUsuario: 'admin',
      email: 'admin@sistemacontable.com',
      password: await bcrypt.hash('admin123', 10),
      nombreCompleto: 'Administrador del Sistema',
      rolId: rolAdmin.id,
      activo: true
    }
  });

  // 4. Crear plan de cuentas básico
  await crearPlanCuentasBasico();

  // 5. Crear secuencias NCF
  await crearSecuenciasNCF(empresa.id);

  console.log('✅ Base de datos sembrada exitosamente');
}

async function crearPlanCuentasBasico() {
  // Activos
  const activos = await prisma.planCuentas.create({
    data: {
      codigo: '1',
      nombre: 'ACTIVOS',
      nivel: 1,
      tipoCuenta: 'ACTIVO',
      naturaleza: 'DEUDORA',
      aceptaMovimiento: false
    }
  });

  await prisma.planCuentas.create({
    data: {
      codigo: '1.1',
      nombre: 'ACTIVOS CORRIENTES',
      nivel: 2,
      tipoCuenta: 'ACTIVO',
      naturaleza: 'DEUDORA',
      cuentaPadreId: activos.id,
      aceptaMovimiento: false
    }
  });

  // ... más cuentas
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
```

## 📝 Archivos Adicionales Necesarios

### Main.tsx (Frontend)

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### index.css (Frontend)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: password
      POSTGRES_DB: sistema_contable_rd
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://usuario:password@postgres:5432/sistema_contable_rd
      NODE_ENV: development
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  postgres_data:
```

## 🎯 Próximos Pasos

1. **Instalar dependencias**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Configurar base de datos**
   ```bash
   cd backend
   npx prisma generate
   npx prisma migrate dev
   npm run seed
   ```

3. **Iniciar desarrollo**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Completar módulos prioritarios**
   - Implementar servicios faltantes
   - Crear componentes de UI
   - Agregar validaciones

5. **Testing**
   - Tests unitarios (Jest)
   - Tests de integración
   - Tests E2E (Playwright)

6. **Deploy**
   - Configurar CI/CD
   - Deploy en servidor (DigitalOcean, AWS, etc.)
   - Configurar dominio y SSL

## 📚 Recursos Adicionales

- [Documentación DGII](https://dgii.gov.do)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)

---

**Nota**: Este es un sistema base completo y funcional. Los módulos están estructurados para ser expandidos según las necesidades específicas del negocio.
