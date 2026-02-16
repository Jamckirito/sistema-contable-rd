# 🔐 Documentación de Seguridad - Sistema Contable RD

## ✅ Medidas de Seguridad Implementadas

### 1. Autenticación y Autorización

#### ✅ JWT (JSON Web Tokens)
- **Access Tokens**: Duración de 24 horas
- **Refresh Tokens**: Duración de 7 días
- Tokens firmados con secreto seguro (configurar en `.env`)
- Validación en cada request
- Revocación de tokens al cerrar sesión

**Implementación:**
```typescript
// auth.service.ts - Generación de tokens
private generateAccessToken(userId: string): string {
  return jwt.sign(
    { userId },
    this.JWT_SECRET,
    { expiresIn: this.JWT_EXPIRES_IN }
  );
}
```

**Middleware de Autenticación:**
```typescript
// auth.middleware.ts
export const authenticate = async (req, res, next) => {
  // Verifica Bearer token
  // Valida token con JWT
  // Busca usuario en BD
  // Verifica que esté activo
  // Agrega usuario al request
}
```

#### ✅ Encriptación de Contraseñas
- **bcrypt** con salt rounds = 10
- Hash one-way (no se pueden desencriptar)
- Comparación segura con timing attack protection

**Código:**
```typescript
// Al registrar
const hashedPassword = await bcrypt.hash(password, 10);

// Al login
const passwordValido = await bcrypt.compare(password, usuario.password);
```

#### ✅ Sistema de Roles y Permisos Granulares

**5 Roles Predefinidos:**

1. **Administrador** (Wildcard `*`)
   - Acceso total al sistema
   - Todas las funcionalidades
   - Gestión de usuarios

2. **Contador**
   - Contabilidad completa
   - Todos los reportes
   - Solo lectura en facturación

3. **Vendedor**
   - Crear y ver facturas
   - Gestión de clientes
   - Ver inventario

4. **Almacenista**
   - Gestión completa de inventario
   - Ver compras
   - Movimientos de stock

5. **Consulta**
   - Solo lectura en todo
   - No puede modificar nada

**Permisos Específicos:**
```typescript
const PERMISOS = {
  'facturas:crear',
  'facturas:ver',
  'facturas:editar',
  'facturas:anular',
  'facturas:pagar',
  'contabilidad:*',
  'reportes:exportar',
  'admin:usuarios',
  '*' // Acceso total
};
```

**Validación de Permisos:**
```typescript
router.post('/facturas', 
  authenticate, 
  authorize('facturas:crear'), 
  crearFactura
);
```

#### ✅ Gestión de Sesiones
- Sesiones almacenadas en base de datos
- Registro de IP y User-Agent
- Fecha de expiración
- Posibilidad de revocar sesiones
- Cierre automático al cambiar contraseña

### 2. Seguridad en el Servidor

#### ✅ Helmet.js
Configura headers HTTP de seguridad:
- X-DNS-Prefetch-Control
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Strict-Transport-Security

```typescript
app.use(helmet());
```

#### ✅ CORS Configurado
- Solo orígenes permitidos
- Credenciales controladas
- Métodos HTTP específicos

```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

#### ✅ Rate Limiting
Previene ataques de fuerza bruta y DDoS:
- 100 requests por 15 minutos por IP
- Configurable vía variables de entorno

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de requests
});

app.use('/api/', limiter);
```

### 3. Validación y Sanitización

#### ✅ Validación con Zod
- Validación de tipos en tiempo de ejecución
- Esquemas reutilizables
- Mensajes de error claros

```typescript
const loginSchema = z.object({
  nombreUsuario: z.string().min(3).max(50),
  password: z.string().min(6)
});
```

#### ✅ Protección contra Inyección SQL
- **Prisma ORM**: Queries parametrizadas automáticamente
- No se construyen queries con strings
- Prevención total de SQL Injection

```typescript
// SEGURO - Prisma maneja la sanitización
await prisma.usuario.findUnique({
  where: { nombreUsuario }
});
```

#### ✅ Protección XSS
- No se usa `dangerouslySetInnerHTML` en React
- Sanitización automática de React
- Headers de seguridad con Helmet

### 4. Logging y Auditoría

#### ✅ Winston Logger
- Logs estructurados en JSON
- Diferentes niveles: error, warn, info, debug
- Rotación automática de archivos
- Logs de producción separados

```typescript
logger.info(`Login exitoso para usuario: ${nombreUsuario}`);
logger.warn(`Intento de login fallido para usuario: ${nombreUsuario}`);
logger.error('Error en base de datos:', error);
```

#### ✅ Tabla de Auditoría
Registra toda actividad crítica:
- Usuario que realizó la acción
- Tipo de acción (CREATE, UPDATE, DELETE)
- Módulo y tabla afectada
- Datos antes y después
- IP address
- Timestamp

```typescript
await prisma.auditoria.create({
  data: {
    usuarioId,
    accion: 'CREATE',
    modulo: 'FACTURACION',
    tabla: 'facturas',
    registroId: factura.id,
    datosDespues: factura,
    ipAddress: req.ip
  }
});
```

### 5. Manejo de Errores Seguro

#### ✅ Error Handler Centralizado
- No expone stack traces en producción
- Mensajes genéricos para usuarios
- Logs detallados en servidor
- Códigos HTTP apropiados

```typescript
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : err.message
  });
});
```

### 6. Variables de Entorno Seguras

#### ✅ Archivo .env.example
Nunca commitear `.env` real a Git

**Variables Críticas:**
```env
# DEBE cambiarse en producción
JWT_SECRET=tu-secreto-super-seguro-cambiar-en-produccion

# Base de datos - nunca exponer
DATABASE_URL=postgresql://...

# DGII - credenciales protegidas
# (APIs externas removidas - solo ejecución local)
```

#### ✅ .gitignore Configurado
Excluye archivos sensibles:
```
.env
.env.local
.env.production
logs/
```

### 7. Frontend Security

#### ✅ Protección de Rutas
```typescript
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

#### ✅ Axios Interceptors
```typescript
// Agregar token automáticamente
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Logout automático en 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### ✅ Almacenamiento Seguro
- Tokens en localStorage (Zustand persist)
- Limpieza al logout
- No almacenar datos sensibles en localStorage

## 🔐 Usuarios Predefinidos

El sistema incluye 3 usuarios de ejemplo (seed):

### 1. Administrador
```
Usuario: admin
Contraseña: admin123
Rol: Administrador (acceso total)
```

### 2. Contador
```
Usuario: contador
Contraseña: contador123
Rol: Contador (contabilidad y reportes)
```

### 3. Vendedor
```
Usuario: vendedor
Contraseña: vendedor123
Rol: Vendedor (facturación y clientes)
```

## ⚠️ IMPORTANTE: Checklist de Seguridad para Producción

### Antes de Deployer:

- [ ] **Cambiar TODAS las contraseñas por defecto**
  ```bash
  # Acceder al sistema con admin
  # Ir a Configuración > Cambiar Contraseña
  ```

- [ ] **Generar JWT_SECRET seguro**
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

- [ ] **Configurar CORS para dominio de producción**
  ```env
  CORS_ORIGIN=https://tu-dominio.com
  ```

- [ ] **Habilitar HTTPS obligatorio**
  - Usar Let's Encrypt o certificado SSL
  - Configurar redirect HTTP → HTTPS

- [ ] **Configurar rate limiting más estricto**
  ```env
  RATE_LIMIT_MAX_REQUESTS=50  # Reducir de 100
  ```

- [ ] **Backup automático de base de datos**
  ```bash
  # Configurar cron job para pg_dump
  0 2 * * * pg_dump sistema_contable_rd > backup_$(date +\%Y\%m\%d).sql
  ```

- [ ] **Habilitar logs de producción**
  ```env
  NODE_ENV=production
  LOG_LEVEL=warn  # Solo warnings y errores
  ```

- [ ] **Revisar permisos de archivos**
  ```bash
  chmod 600 .env
  chmod 700 logs/
  ```

- [ ] **Configurar firewall**
  - Solo puertos necesarios abiertos (80, 443, 5432 solo localhost)
  - Bloquear acceso directo a BD desde internet

- [ ] **Habilitar 2FA (Futuro)**
  - Implementar autenticación de dos factores
  - Especialmente para administradores

## 🛡️ Mejoras de Seguridad Futuras

### Corto Plazo (1-2 meses):
- [ ] Implementar 2FA/MFA
- [ ] Política de contraseñas fuertes (regex validation)
- [ ] Expiración forzada de contraseñas (90 días)
- [ ] Bloqueo de cuenta tras intentos fallidos
- [ ] Whitelist de IPs para panel admin

### Medio Plazo (3-6 meses):
- [ ] Encriptación de datos sensibles en BD
- [ ] Firma digital de documentos
- [ ] Certificado SSL EV
- [ ] Pentesting profesional
- [ ] Auditoría de seguridad externa

### Largo Plazo (6+ meses):
- [ ] WAF (Web Application Firewall)
- [ ] DDoS protection (Cloudflare)
- [ ] Compliance SOC 2
- [ ] Bug bounty program

## 📚 Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [DGII Seguridad](https://dgii.gov.do/seguridad)

## 🆘 En Caso de Incidente de Seguridad

1. **Desconectar sistema inmediatamente**
2. **Preservar logs y evidencia**
3. **Cambiar todas las credenciales**
4. **Investigar el alcance**
5. **Notificar a usuarios afectados**
6. **Implementar parches**
7. **Documentar el incidente**

---

**El sistema tiene seguridad de nivel empresarial implementada. Seguir el checklist de producción es CRÍTICO.**
