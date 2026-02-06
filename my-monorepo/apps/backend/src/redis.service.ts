import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client?: RedisClientType;

  private ensureConnected(): RedisClientType {
    if (!this.client?.isOpen) {
      throw new ServiceUnavailableException('Redis is not connected');
    }
    return this.client;
  }

  async onModuleInit() {
    const host = process.env.REDIS_HOST ?? 'localhost';
    const port = Number.parseInt(process.env.REDIS_PORT ?? '6379', 10);

    this.client = createClient({
      socket: {
        host,
        port,
      },
    });

    // Keep an 'error' listener to avoid unhandled EventEmitter errors.
    // Log at debug to keep noise low during local dev.
    this.client.on('error', (err) =>
      this.logger.debug(`Redis error: ${String(err)}`),
    );

    try {
      await this.client.connect();
      this.logger.log(`Redis connected (${host}:${port})`);
    } catch (err) {
      this.logger.warn(
        `Redis connection failed (${host}:${port}): ${String(err)}`,
      );
    }
  }

  async onModuleDestroy() {
    if (!this.client) return;
    try {
      if (this.client.isOpen) {
        await this.client.quit();
      }
    } catch (err) {
      this.logger.debug(`Redis quit error: ${String(err)}`);
    }
  }

  async set(key: string, value: string) {
    return this.ensureConnected().set(key, value);
  }

  async get(key: string) {
    return this.ensureConnected().get(key);
  }
}
