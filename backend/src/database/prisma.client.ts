import { PrismaClient } from '@prisma/client';
import { logger } from '../shared/utils/logger';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Manejar desconexión
process.on('beforeExit', async () => {
  logger.info('Desconectando Prisma Client...');
  await prisma.$disconnect();
});

export default prisma;
