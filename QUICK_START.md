# 🚀 Inicio Rápido - Sistema Contable RD

## ⚡ Instalación Express (5 minutos)

### 1. Requisitos Previos
- Node.js 18+ instalado
- PostgreSQL 14+ instalado y corriendo
- Git instalado

### 2. Clonar y Configurar

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/sistema-contable-rd.git
cd sistema-contable-rd

# Instalar dependencias del backend
cd backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones de base de datos

# Crear base de datos
createdb sistema_contable_rd

# Ejecutar migraciones y seed
npx prisma migrate dev
npx prisma generate
npm run seed

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### 3. Iniciar Aplicación

```bash
# En una terminal - Backend
cd backend
npm run dev

# En otra terminal - Frontend
cd frontend
npm run dev
```

### 4. Acceder al Sistema

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Credenciales por defecto**:
  - Usuario: `admin`
  - Contraseña: `admin123`

## 📊 Verificación Rápida

Una vez iniciado, deberías poder:

✅ Iniciar sesión con las credenciales de administrador
✅ Ver el dashboard con métricas básicas
✅ Navegar por los diferentes módulos
✅ Crear una factura de prueba

## 🔧 Comandos Útiles

### Backend
```bash
npm run dev          # Modo desarrollo con hot-reload
npm run build        # Compilar TypeScript
npm start            # Iniciar en producción
npm run seed         # Sembrar datos de prueba
npx prisma studio    # Abrir interfaz de base de datos
```

### Frontend
```bash
npm run dev          # Modo desarrollo
npm run build        # Compilar para producción
npm run preview      # Preview de build de producción
```

## 🐳 Con Docker (Alternativa)

```bash
# Iniciar todo con docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## 📚 Próximos Pasos

1. **Personalizar Empresa**: Ir a Configuración > Datos de la Empresa
2. **Crear Usuarios**: Configuración > Usuarios y Roles
3. **Configurar NCF**: Configuración > Secuencias NCF
4. **Importar Clientes**: Clientes > Importar CSV
5. **Configurar Plan de Cuentas**: Contabilidad > Plan de Cuentas

## ❓ Problemas Comunes

### Error de conexión a la base de datos
```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Verificar credenciales en .env
DATABASE_URL="postgresql://usuario:password@localhost:5432/sistema_contable_rd"
```

### Puerto 3000 o 5173 en uso
```bash
# Backend - cambiar puerto en .env
PORT=3001

# Frontend - cambiar en vite.config.ts
server: { port: 5174 }
```

### Error al instalar dependencias
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 🆘 Soporte

- 📖 Documentación completa: `/docs`
- 🐛 Reportar bugs: GitHub Issues
- 💬 Comunidad: Discord/Slack

---

**¡Listo! Ya tienes el sistema corriendo localmente.**

Para configuración avanzada y deployment, consulta `/docs/IMPLEMENTATION_GUIDE.md`
