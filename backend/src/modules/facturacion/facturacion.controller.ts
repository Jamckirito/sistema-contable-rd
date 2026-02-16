import { Response } from 'express';
import { FacturacionService } from './facturacion.service';
import { asyncHandler } from '../../shared/middleware/error.middleware';
import { AuthRequest } from '../../shared/middleware/auth.middleware';

const facturacionService = new FacturacionService();

export const crearFactura = asyncHandler(async (req: AuthRequest, res: Response) => {
  const factura = await facturacionService.crearFactura(req.body, req.user!.id);
  
  res.status(201).json({
    success: true,
    message: 'Factura creada exitosamente',
    data: factura
  });
});

export const obtenerFactura = asyncHandler(async (req: AuthRequest, res: Response) => {
  const factura = await facturacionService.obtenerFactura(req.params.id);
  
  res.json({
    success: true,
    data: factura
  });
});

export const listarFacturas = asyncHandler(async (req: AuthRequest, res: Response) => {
  const resultado = await facturacionService.listarFacturas(req.query);
  
  res.json({
    success: true,
    data: resultado
  });
});

export const anularFactura = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { motivoAnulacion } = req.body;
  const factura = await facturacionService.anularFactura(
    req.params.id,
    motivoAnulacion,
    req.user!.id
  );
  
  res.json({
    success: true,
    message: 'Factura anulada exitosamente',
    data: factura
  });
});

export const registrarPago = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { monto, formaPago, numeroReferencia } = req.body;
  const pago = await facturacionService.registrarPago(
    req.params.id,
    monto,
    formaPago,
    numeroReferencia,
    req.user!.id
  );
  
  res.json({
    success: true,
    message: 'Pago registrado exitosamente',
    data: pago
  });
});
