import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../database/prisma.client';
import { AppError } from '../../shared/middleware/error.middleware';
import { logger } from '../../shared/utils/logger';

export interface LoginCredentials {
  nombreUsuario: string;
  password: string;
}

export interface RegisterData {
  nombreUsuario: string;
  email: string;
  password: string;
  nombreCompleto: string;
  rolId: string;
  sucursalId?: string;
}

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'local-dev-secret';
  private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
  private readonly JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

  async login(credentials: LoginCredentials, ipAddress?: string, userAgent?: string) {
    const { nombreUsuario, password } = credentials;

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { nombreUsuario },
      include: { 
        rol: true,
        sucursal: true
      }
    });

    if (!usuario) {
      logger.warn(`Intento de login fallido para usuario: ${nombreUsuario}`);
      throw new AppError('Credenciales inválidas', 401);
    }

    if (!usuario.activo) {
      throw new AppError('Usuario inactivo', 401);
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      logger.warn(`Contraseña incorrecta para usuario: ${nombreUsuario}`);
      throw new AppError('Credenciales inválidas', 401);
    }

    // Generar tokens
    const accessToken = this.generateAccessToken(usuario.id);
    const refreshToken = this.generateRefreshToken(usuario.id);

    // Guardar sesión
    const expiraEn = new Date();
    expiraEn.setHours(expiraEn.getHours() + 24);

    await prisma.sesion.create({
      data: {
        usuarioId: usuario.id,
        token: accessToken,
        refreshToken,
        ipAddress,
        userAgent,
        expiraEn,
        activa: true
      }
    });

    logger.info(`Login exitoso para usuario: ${nombreUsuario}`);

    // Normalizar permisos a array de strings (Prisma Json puede venir como objeto/array)
    const rawPermisos = usuario.rol.permisos;
    const permisos = Array.isArray(rawPermisos)
      ? (rawPermisos as unknown[]).map(String)
      : typeof rawPermisos === 'string'
        ? (rawPermisos ? [rawPermisos] : [])
        : [];

    return {
      accessToken,
      refreshToken,
      usuario: {
        id: usuario.id,
        nombreUsuario: usuario.nombreUsuario,
        email: usuario.email,
        nombreCompleto: usuario.nombreCompleto,
        rol: usuario.rol.nombre,
        permisos,
        sucursal: usuario.sucursal ?? null
      }
    };
  }

  async register(data: RegisterData) {
    const { nombreUsuario, email, password, nombreCompleto, rolId, sucursalId } = data;

    // Verificar si el usuario ya existe
    const usuarioExistente = await prisma.usuario.findFirst({
      where: {
        OR: [
          { nombreUsuario },
          { email }
        ]
      }
    });

    if (usuarioExistente) {
      throw new AppError('El usuario o email ya existe', 409);
    }

    // Verificar que el rol existe
    const rol = await prisma.rol.findUnique({ where: { id: rolId } });
    if (!rol) {
      throw new AppError('Rol no encontrado', 404);
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const usuario = await prisma.usuario.create({
      data: {
        nombreUsuario,
        email,
        password: hashedPassword,
        nombreCompleto,
        rolId,
        sucursalId,
        activo: true
      },
      include: {
        rol: true,
        sucursal: true
      }
    });

    logger.info(`Usuario registrado: ${nombreUsuario}`);

    return {
      id: usuario.id,
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      nombreCompleto: usuario.nombreCompleto,
      rol: usuario.rol.nombre,
      sucursal: usuario.sucursal
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verificar refresh token
      const decoded = jwt.verify(refreshToken, this.JWT_SECRET) as any;

      // Buscar sesión
      const sesion = await prisma.sesion.findFirst({
        where: {
          refreshToken,
          activa: true,
          usuarioId: decoded.userId
        }
      });

      if (!sesion) {
        throw new AppError('Sesión inválida', 401);
      }

      // Generar nuevo access token
      const newAccessToken = this.generateAccessToken(decoded.userId);

      // Actualizar sesión
      await prisma.sesion.update({
        where: { id: sesion.id },
        data: { token: newAccessToken }
      });

      return { accessToken: newAccessToken };

    } catch (error) {
      throw new AppError('Token de refresco inválido', 401);
    }
  }

  async logout(token: string) {
    await prisma.sesion.updateMany({
      where: { token },
      data: { activa: false }
    });

    logger.info('Usuario cerró sesión');
  }

  private generateAccessToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.JWT_SECRET as jwt.Secret,
      { expiresIn: this.JWT_EXPIRES_IN } as jwt.SignOptions
    );
  }

  private generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.JWT_SECRET as jwt.Secret,
      { expiresIn: this.JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions
    );
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId }
    });

    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Verificar contraseña actual
    const passwordValido = await bcrypt.compare(oldPassword, usuario.password);

    if (!passwordValido) {
      throw new AppError('Contraseña actual incorrecta', 401);
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await prisma.usuario.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    // Cerrar todas las sesiones activas
    await prisma.sesion.updateMany({
      where: { usuarioId: userId, activa: true },
      data: { activa: false }
    });

    logger.info(`Contraseña cambiada para usuario ID: ${userId}`);
  }
}
