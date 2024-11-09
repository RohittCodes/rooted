import { PrismaClient } from '@prisma/client';

// TODO: Edit this file to make the error go away

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export * from '@prisma/client';