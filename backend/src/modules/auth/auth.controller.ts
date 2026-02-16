import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { asyncHandler } from '../../shared/middleware/error.middleware';
import { AuthRequest } from '../../shared/middleware/auth.middleware';

const authService = new AuthService();

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { nombreUsuario, password } = req.body;
  const ipAddress = req.ip;
  const userAgent = req.headers['user-agent'];

  const result = await authService.login(
    { nombreUsuario, password },
    ipAddress,
    userAgent
  );

  res.json({
    success: true,
    message: 'Login exitoso',
    data: result
  });
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente',
    data: result
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const result = await authService.refreshToken(refreshToken);

  res.json({
    success: true,
    data: result
  });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  const token = req.headers.authorization?.substring(7);

  if (token) {
    await authService.logout(token);
  }

  res.json({
    success: true,
    message: 'Sesión cerrada exitosamente'
  });
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user!.id;

  await authService.changePassword(userId, oldPassword, newPassword);

  res.json({
    success: true,
    message: 'Contraseña cambiada exitosamente'
  });
});

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: req.user
  });
});
