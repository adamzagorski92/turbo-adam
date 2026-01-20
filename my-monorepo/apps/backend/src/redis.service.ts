import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  async onModuleInit() {
    const host = process.env.REDIS_HOST ?? 'localhost';
    const port = Number.parseInt(process.env.REDIS_PORT ?? '6379', 10);

    this.client = createClient({
      socket: {
        host,
        port,
      },
    });

    this.client.on('error', (err) => console.log('Redis Error:', err));

    try {
      await this.client.connect();
      console.log('✅ Redis connected');
    } catch (err) {
      console.error('❌ Redis connection failed:', err);
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }

  async set(key: string, value: string) {
    return this.client.set(key, value);
  }

  async get(key: string) {
    return this.client.get(key);
  }
}
