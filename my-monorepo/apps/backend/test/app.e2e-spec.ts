import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'http';
import { AppModule } from './../src/app.module.js';
import { RedisService } from './../src/redis.service.js';
import { DatabaseService } from './../src/database.service.js';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const redisServiceMock: Pick<RedisService, 'get' | 'set'> = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue('OK'),
    };

    const databaseServiceMock: Pick<DatabaseService, 'getPrisma'> = {
      getPrisma: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RedisService)
      .useValue(redisServiceMock)
      .overrideProvider(DatabaseService)
      .useValue(databaseServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const server = app.getHttpServer() as Server;

    return request(server).get('/').expect(200).expect('Hello World!');
  });
});
