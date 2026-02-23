/**
 * Manual Jest mock for Prisma v7 generated client.
 *
 * The real generated client uses `import.meta.url` which is incompatible with
 * Jest's CJS runtime. Since tests mock DatabaseService anyway, we only need
 * a stub PrismaClient class for type-casting.
 */
export class PrismaClient {
  $connect = jest.fn();
  $disconnect = jest.fn();
  $queryRaw = jest.fn();
}
