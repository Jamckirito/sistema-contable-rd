import { Router, type IRouter } from 'express';
import { authenticate, authorize } from '../../shared/middleware/auth.middleware';

const router: IRouter = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// TODO: Implementar rutas específicas del módulo
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Módulo bancos - Por implementar',
    module: 'bancos'
  });
});

export default router;
