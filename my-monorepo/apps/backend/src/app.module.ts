import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RedisService } from './redis.service.js';
import { DatabaseService } from './database.service.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RedisService, DatabaseService],
})
export class AppModule {}
