// Base de datos mock para desarrollo
// Cuando configures Vercel Postgres, descomenta el código de abajo

// import { PrismaClient } from "@/generated/prisma/client";
// 
// const globalForPrisma = globalThis as unknown as {
//   prisma: typeof PrismaClient | undefined;
// };
// 
// const createClient = () => new PrismaClient();
// 
// export const prisma = globalForPrisma.prisma ?? createClient();
// 
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// Mock client para desarrollo
export const prisma = {
  user: {
    findUnique: async (_?: unknown) => null,
    findMany: async (_?: unknown) => [],
    create: async (data: unknown) => data as { id: string },
    update: async (_: unknown, data: unknown) => data as { id: string },
    delete: async (_?: unknown) => ({}),
  },
  inventoryItem: {
    findMany: async (_?: unknown) => [],
    findUnique: async (_?: unknown) => null,
    create: async (data: unknown) => data as { id: string },
    update: async (_: unknown, data: unknown) => data as { id: string },
    delete: async (_?: unknown) => ({}),
  },
  materialMenor: {
    findMany: async (_?: unknown) => [],
    findUnique: async (_?: unknown) => null,
    create: async (data: unknown) => data as { id: string },
    update: async (_: unknown, data: unknown) => data as { id: string },
    delete: async (_?: unknown) => ({}),
  },
  attendance: {
    findMany: async (_?: unknown) => [],
    count: async (_?: unknown) => 0,
    groupBy: async (_?: unknown) => [],
    create: async (data: unknown) => data as { id: string },
    delete: async (_?: unknown) => ({}),
  },
  bitacoraSalida: {
    findMany: async (_?: unknown) => [],
    findUnique: async (_?: unknown) => null,
    create: async (data: unknown) => data as { id: string },
    delete: async (_?: unknown) => ({}),
  },
  calendarEvent: {
    findMany: async (_?: unknown) => [],
    create: async (data: unknown) => data as { id: string },
    delete: async (_?: unknown) => ({}),
  },
  vehicle: {
    findMany: async (_?: unknown) => [],
    findUnique: async (_?: unknown) => null,
    create: async (data: unknown) => data as { id: string },
    update: async (_: unknown, data: unknown) => data as { id: string },
    delete: async (_?: unknown) => ({}),
  },
  auditLog: {
    create: async (data: unknown) => data as { id: string },
  },
} as const;
