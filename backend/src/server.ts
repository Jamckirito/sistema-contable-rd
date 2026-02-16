import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Configurar variables de entorno
dotenv.config();

// Importar rutas de módulos
import authRoutes from './modules/auth/auth.routes';
import contabilidadRoutes from './modules/contabilidad/contabilidad.routes';
import facturacionRoutes from './modules/facturacion/facturacion.routes';
import inventarioRoutes from './modules/inventario/inventario.routes';
import clientesRoutes from './modules/clientes/clientes.routes';
import itbisRoutes from './modules/itbis/itbis.routes';
import bancosRoutes from './modules/bancos/bancos.routes';
import reportesRoutes from './modules/reportes/reportes.routes';

// Importar utilidades
import { logger } from './shared/utils/logger';
import { errorHandler } from './shared/middleware/error.middleware';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// MIDDLEWARE DE SEGURIDAD
// ============================================================================

// Helmet para headers de seguridad
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde.'
});

app.use('/api/', limiter);

// ============================================================================
// MIDDLEWARE DE PARSEO
// ============================================================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================================
// LOGGING
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim())
    }
  }));
}

// ============================================================================
// RUTAS
// ============================================================================

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'Sistema Contable RD API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/contabilidad', contabilidadRoutes);
app.use('/api/facturacion', facturacionRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/itbis', itbisRoutes);
app.use('/api/bancos', bancosRoutes);
app.use('/api/reportes', reportesRoutes);

// Ruta 404
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// ============================================================================
// MANEJO DE ERRORES
// ============================================================================

app.use(errorHandler);

// ============================================================================
// INICIO DEL SERVIDOR
// ============================================================================

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor corriendo en puerto ${PORT}`);
      logger.info(`📊 Ambiente: ${process.env.NODE_ENV}`);
      logger.info(`🔗 API disponible en http://localhost:${PORT}/api`);
      logger.info(`❤️  Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();

export default app;
