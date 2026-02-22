import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RedisService } from './redis.service.js';
import { DatabaseService } from './database.service.js';
import { PrismaClient } from './generated/prisma/client.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const redisServiceMock: Pick<RedisService, 'get' | 'set'> = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue('OK'),
    };

    const prismaMock = {
      $queryRaw: jest.fn().mockResolvedValue([{ now: new Date() }]),
    } as unknown as PrismaClient;

    const databaseServiceMock: Pick<DatabaseService, 'getPrisma'> = {
      getPrisma: jest.fn(() => prismaMock),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: RedisService, useValue: redisServiceMock },
        { provide: DatabaseService, useValue: databaseServiceMock },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
