import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import { prisma } from '../../database/prisma.client';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    nombreUsuario: string;
    email: string;
    rol: string;
    permisos: string[];
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No se proporcionó token de autenticación', 401);
    }

    const token = authHeader.substring(7);

    // Verificar token
    const secret = process.env.JWT_SECRET || 'local-dev-secret';
    const decoded = jwt.verify(token, secret) as any;

    // Buscar usuario y verificar que existe y está activo
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      include: { rol: true }
    });

    if (!usuario || !usuario.activo) {
      throw new AppError('Usuario no encontrado o inactivo', 401);
    }

    // Parsear permisos (en SQLite se guardan como JSON string)
    let permisos: string[] = [];
    const raw: unknown = usuario.rol.permisos;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        permisos = Array.isArray(parsed) ? parsed.map(String) : parsed ? [String(parsed)] : [];
      } catch {
        permisos = raw ? [raw] : [];
      }
    } else if (Array.isArray(raw)) {
      permisos = (raw as unknown[]).map(String);
    }

    req.user = {
      id: usuario.id,
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      rol: usuario.rol.nombre,
      permisos
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Token inválido', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expirado', 401));
    } else {
      next(error);
    }
  }
};

export const authorize = (...permisosRequeridos: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('No autenticado', 401));
    }

    const tienePermiso = permisosRequeridos.some(permiso => 
      req.user!.permisos.includes(permiso) || req.user!.permisos.includes('*')
    );

    if (!tienePermiso) {
      return next(new AppError('No tiene permisos para realizar esta acción', 403));
    }

    next();
  };
};
