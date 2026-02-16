# 📝 Guía de Recreación Manual del Proyecto

Si no puedes descargar los archivos, sigue estos pasos para recrear el proyecto completo en tu computadora.

## Paso 1: Crear Estructura de Carpetas

```bash
# Crear directorio principal
mkdir sistema-contable-rd
cd sistema-contable-rd

# Crear estructura backend
mkdir -p backend/src/{modules/{auth,facturacion,contabilidad,inventario,clientes,itbis,bancos,reportes},shared/{middleware,utils},database,config}
mkdir -p backend/prisma

# Crear estructura frontend
mkdir -p frontend/src/{components/{layouts,common},pages/{auth,facturacion,clientes,inventario,contabilidad,reportes},services,hooks,store,types,utils}
mkdir -p frontend/public

# Crear carpeta de documentación
mkdir docs
```

## Paso 2: Archivos del Backend

### backend/package.json
Copia y pega este contenido en `backend/package.json`:

[VER ARCHIVO: backend/package.json en el proyecto compartido]

### backend/prisma/schema.prisma
Copia el esquema completo de la base de datos:

[VER ARCHIVO: backend/prisma/schema.prisma en el proyecto compartido]

### backend/src/server.ts
Copia el servidor principal:

[VER ARCHIVO: backend/src/server.ts en el proyecto compartido]

### backend/src/modules/auth/auth.service.ts
[VER ARCHIVO: backend/src/modules/auth/auth.service.ts]

### backend/src/modules/auth/auth.controller.ts
[VER ARCHIVO: backend/src/modules/auth/auth.controller.ts]

### backend/src/modules/auth/auth.routes.ts
[VER ARCHIVO: backend/src/modules/auth/auth.routes.ts]

### backend/src/shared/middleware/auth.middleware.ts
[VER ARCHIVO: backend/src/shared/middleware/auth.middleware.ts]

### backend/src/shared/middleware/error.middleware.ts
[VER ARCHIVO: backend/src/shared/middleware/error.middleware.ts]

### backend/src/shared/utils/logger.ts
[VER ARCHIVO: backend/src/shared/utils/logger.ts]

### backend/src/database/prisma.client.ts
[VER ARCHIVO: backend/src/database/prisma.client.ts]

### backend/src/database/seed.ts
[VER ARCHIVO: backend/src/database/seed.ts]

### backend/tsconfig.json
[VER ARCHIVO: backend/tsconfig.json]

### backend/.env.example
[VER ARCHIVO: backend/.env.example]

## Paso 3: Archivos del Frontend

### frontend/package.json
[VER ARCHIVO: frontend/package.json]

### frontend/vite.config.ts
[VER ARCHIVO: frontend/vite.config.ts]

### frontend/tsconfig.json
[VER ARCHIVO: frontend/tsconfig.json]

### frontend/tailwind.config.js
[VER ARCHIVO: frontend/tailwind.config.js]

### frontend/index.html
[VER ARCHIVO: frontend/index.html]

### frontend/src/main.tsx
[VER ARCHIVO: frontend/src/main.tsx]

### frontend/src/App.tsx
[VER ARCHIVO: frontend/src/App.tsx]

### frontend/src/index.css
[VER ARCHIVO: frontend/src/index.css]

### frontend/src/pages/auth/Login.tsx
[VER ARCHIVO: frontend/src/pages/auth/Login.tsx]

### frontend/src/pages/index.tsx
[VER ARCHIVO: frontend/src/pages/index.tsx]

### frontend/src/store/authStore.ts
[VER ARCHIVO: frontend/src/store/authStore.ts]

### frontend/src/services/api.ts
[VER ARCHIVO: frontend/src/services/api.ts]

## Paso 4: Archivos Raíz

### README.md
[VER ARCHIVO: README.md]

### QUICK_START.md
[VER ARCHIVO: QUICK_START.md]

### SECURITY_SUMMARY.md
[VER ARCHIVO: SECURITY_SUMMARY.md]

### LICENSE
[VER ARCHIVO: LICENSE]

### .gitignore
[VER ARCHIVO: .gitignore]

## Paso 5: Instalación

Una vez copiados todos los archivos:

```bash
# Instalar backend
cd backend
npm install

# Configurar .env
cp .env.example .env
# Editar .env con tus datos

# Crear base de datos
createdb sistema_contable_rd

# Ejecutar migraciones
npx prisma migrate dev
npx prisma generate

# Sembrar datos
npm run seed

# Instalar frontend
cd ../frontend
npm install

# Iniciar desarrollo
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

## Lista de Archivos Completa

BACKEND (40 archivos):
- package.json
- tsconfig.json
- .env.example
- prisma/schema.prisma
- src/server.ts
- src/modules/auth/auth.service.ts
- src/modules/auth/auth.controller.ts
- src/modules/auth/auth.routes.ts
- src/modules/facturacion/facturacion.service.ts
- src/modules/facturacion/facturacion.controller.ts
- src/modules/facturacion/facturacion.routes.ts
- src/modules/contabilidad/contabilidad.routes.ts
- src/modules/inventario/inventario.routes.ts
- src/modules/clientes/clientes.routes.ts
- src/modules/itbis/itbis.routes.ts
- src/modules/bancos/bancos.routes.ts
- src/modules/reportes/reportes.routes.ts
- src/shared/middleware/auth.middleware.ts
- src/shared/middleware/error.middleware.ts
- src/shared/utils/logger.ts
- src/database/prisma.client.ts
- src/database/seed.ts

FRONTEND (15 archivos):
- package.json
- tsconfig.json
- vite.config.ts
- tailwind.config.js
- index.html
- src/main.tsx
- src/App.tsx
- src/index.css
- src/pages/auth/Login.tsx
- src/pages/index.tsx
- src/store/authStore.ts
- src/services/api.ts

RAÍZ (6 archivos):
- README.md
- QUICK_START.md
- SECURITY_SUMMARY.md
- PROJECT_SUMMARY.md
- LICENSE
- .gitignore

DOCS (3 archivos):
- docs/IMPLEMENTATION_GUIDE.md
- docs/SECURITY.md
- docs/SECURITY_ARCHITECTURE.txt

## Alternativa: Clonar desde GitHub

Si ya subiste el proyecto a GitHub, simplemente:

```bash
git clone https://github.com/tu-usuario/sistema-contable-rd.git
cd sistema-contable-rd
```

Y seguir con la instalación (Paso 5).
