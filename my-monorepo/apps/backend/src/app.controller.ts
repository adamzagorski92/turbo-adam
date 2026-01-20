import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { RedisService } from './redis.service.js';
import { DatabaseService } from './database.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
    private readonly databaseService: DatabaseService, // ← Dodaj tu
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redis-test')
  async testRedis() {
    await this.redisService.set('test-key', 'test-value');
    const value = await this.redisService.get('test-key');
    return { message: 'Redis works!', value };
  }

  @Get('postgres-test')
  async testPostgres() {
    const result = await this.databaseService.getPrisma()
      .$queryRaw`SELECT NOW()`;
    return { message: 'PostgreSQL works!', time: result };
  }
}
