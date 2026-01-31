import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import type { PrismaClient as PrismaClientType } from '@prisma/client';
import prismaPkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const { PrismaClient } = prismaPkg;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly prisma: PrismaClientType;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool, { disposeExternalPool: true });
    this.prisma = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    try {
      await this.prisma.$connect();
      console.log('✅ PostgreSQL connected via Prisma');
    } catch (err) {
      console.error('❌ PostgreSQL connection failed:', err);
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  getPrisma() {
    return this.prisma;
  }
}
