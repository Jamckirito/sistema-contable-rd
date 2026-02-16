# Sistema Contable RD - Sistema de Contabilidad Completo para República Dominicana

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

Sistema de contabilidad integral diseñado específicamente para cumplir con las normativas fiscales de la República Dominicana (DGII). Incluye todos los módulos necesarios para gestionar la contabilidad, facturación, inventario, nómina y reportes fiscales de cualquier tipo de empresa.

## 🚀 Características Principales

### ✅ Módulos Core (Obligatorios)
- **Contabilidad General**: Catálogo de cuentas, partida doble, libros contables
- **Facturación Electrónica**: e-CF con todos los tipos de NCF (B01-B15)
- **ITBIS**: Cálculo automático, reportes 606/607 en XML
- **Retenciones**: ISR e ITBIS con generación IR-17
- **Cuentas por Cobrar/Pagar**: Gestión completa de clientes y suplidores
- **Bancos y Tesorería**: Conciliación bancaria, flujo de caja
- **Inventario**: PEPS, Promedio Ponderado, control de stock
- **Activos Fijos**: Depreciación según tasas DGII
- **Reportes Fiscales**: IT-1, estados financieros NIIF

### 🔧 Módulos Opcionales
- **Nómina y RRHH**: Cálculo TSS, Infotep, prestaciones
- **Punto de Venta (POS)**: Ventas rápidas con NCF instantáneo
- **Compras**: Órdenes de compra, recepción de mercancía
- **Proyectos**: Costeo por proyecto/obra
- **Producción**: Manufactura, fórmulas, costos de producción
- **CRM**: Gestión de clientes y oportunidades

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: PostgreSQL 14+
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Autenticación**: JWT + bcrypt
- **Validación**: Zod
- **ORM**: Prisma
- **Testing**: Jest + React Testing Library

### Arquitectura Modular
```
sistema-contable-rd/
├── backend/
│   ├── src/
│   │   ├── modules/          # Módulos independientes
│   │   │   ├── contabilidad/
│   │   │   ├── facturacion/
│   │   │   ├── itbis/
│   │   │   ├── inventario/
│   │   │   └── ...
│   │   ├── shared/           # Código compartido
│   │   ├── database/         # Configuración DB
│   │   └── server.ts
│   └── prisma/
│       └── schema.prisma
├── frontend/
│   ├── src/
│   │   ├── modules/          # Componentes por módulo
│   │   ├── shared/           # Componentes compartidos
│   │   ├── hooks/
│   │   └── App.tsx
│   └── package.json
├── docs/                     # Documentación
└── docker-compose.yml
```

## 🔐 Seguridad

### ✅ Sistema de Login Completo

El sistema incluye autenticación JWT completa con:
- **3 usuarios predefinidos** (ver abajo)
- Passwords hasheados con bcrypt
- Access + Refresh Tokens
- Sesiones rastreadas en base de datos
- Sistema de roles y permisos granulares

### 👤 Usuarios Incluidos

El seed crea automáticamente estos usuarios:

| Usuario | Contraseña | Rol | Permisos |
|---------|-----------|-----|----------|
| `admin` | `admin123` | Administrador | Acceso total (*) |
| `contador` | `contador123` | Contador | Contabilidad y reportes |
| `vendedor` | `vendedor123` | Vendedor | Facturación y clientes |

⚠️ **IMPORTANTE:** Cambiar contraseñas en producción

### 🛡️ Características de Seguridad

- ✅ JWT con tokens de acceso y refresco
- ✅ Passwords encriptados (bcrypt salt 10)
- ✅ Protección contra SQL Injection (Prisma ORM)
- ✅ Protección XSS
- ✅ Rate Limiting (100 req/15min)
- ✅ CORS configurado
- ✅ Helmet.js para headers seguros
- ✅ Auditoría completa de acciones
- ✅ Logs estructurados con Winston
- ✅ Rutas protegidas en frontend
- ✅ Session management en BD

Para detalles completos de seguridad, ver:
- [`SECURITY_SUMMARY.md`](SECURITY_SUMMARY.md) - Resumen rápido
- [`docs/SECURITY.md`](docs/SECURITY.md) - Documentación completa (13 páginas)

## 📋 Requisitos Previos

- Node.js 18+ y npm/yarn
- PostgreSQL 14+
- Git

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/sistema-contable-rd.git
cd sistema-contable-rd
```

### 2. Configurar Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus configuraciones
```

### 3. Configurar Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb sistema_contable_rd

# Ejecutar migraciones
npx prisma migrate dev

# Sembrar datos iniciales
npm run seed
```

### 4. Configurar Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
# Editar .env con la URL del backend
```

### 5. Iniciar en Desarrollo
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API Docs: http://localhost:3000/api-docs

## 🐳 Docker (Alternativa)

```bash
docker-compose up -d
```

## 📚 Documentación

### Guías Principales
- [Instalación y Configuración](docs/instalacion.md)
- [Guía de Usuario](docs/guia-usuario.md)
- [API Documentation](docs/api.md)
- [Módulos y Funcionalidades](docs/modulos.md)

### Normativas DGII
- [Comprobantes Fiscales Electrónicos](docs/ncf-ecf.md)
- [Reportes ITBIS 606/607](docs/itbis.md)
- [Declaración IT-1](docs/it1.md)
- [Retenciones IR-17](docs/retenciones.md)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 🚀 Despliegue en Producción

### Variables de Entorno (local)
```env
NODE_ENV=development
DATABASE_URL=file:./dev.db
```

### Build
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## 🔐 Seguridad

- Autenticación JWT con refresh tokens
- Encriptación de contraseñas con bcrypt
- Protección CSRF
- Rate limiting en endpoints
- Validación de datos con Zod
- Auditoría completa de transacciones
- Respaldos automáticos diarios

## 📊 Características de Cumplimiento Fiscal RD

✅ Comprobantes Fiscales Electrónicos (e-CF) certificados DGII
✅ Generación automática reportes 606/607 XML
✅ Cálculo ITBIS 18% y todas sus variantes
✅ Retenciones ISR e ITBIS según normativa
✅ Formularios IT-1, IR-17, IR-2, IR-3
✅ Estados financieros NIIF
✅ Depreciación según tasas DGII
✅ Control de NCF (secuencias y vigencias)
✅ TSS y nómina electrónica
✅ Certificaciones fiscales automáticas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👥 Autores

- **Tu Nombre** - Desarrollo inicial

## 🙏 Agradecimientos

- DGII República Dominicana por la documentación de normativas fiscales
- Comunidad de desarrolladores open source

## 📞 Soporte

- Email: soporte@sistemacontablerd.com
- Issues: https://github.com/tu-usuario/sistema-contable-rd/issues
- Documentación: https://docs.sistemacontablerd.com

## 🗺️ Roadmap

- [x] Módulos core de contabilidad
- [x] Integración DGII (e-CF)
- [ ] App móvil (React Native)
- [ ] Integración con bancos dominicanos
- [ ] IA para categorización automática
- [ ] Dashboard predictivo con ML
- [ ] Multi-empresa
- [ ] API pública para integraciones

---

**Hecho con ❤️ en República Dominicana**
