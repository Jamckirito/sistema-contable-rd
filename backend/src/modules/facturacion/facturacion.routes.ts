import { Router } from 'express';
import * as facturacionController from './facturacion.controller';
import { authenticate, authorize } from '../../shared/middleware/auth.middleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// Rutas de facturas
router.post('/', authorize('facturas:crear'), facturacionController.crearFactura);
router.get('/', authorize('facturas:ver'), facturacionController.listarFacturas);
router.get('/:id', authorize('facturas:ver'), facturacionController.obtenerFactura);
router.post('/:id/anular', authorize('facturas:anular'), facturacionController.anularFactura);
router.post('/:id/pagar', authorize('facturas:pagar'), facturacionController.registrarPago);

export default router;
