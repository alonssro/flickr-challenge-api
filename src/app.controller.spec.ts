import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { HttpService, HttpModule, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import * as request from 'supertest';

export class FlickrSearchDto {
  text: string;
}

describe('AppService', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const testAppModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule, ConfigModule.forRoot()],
      providers: [AppService],
      controllers: [AppController],
    }).compile();
    app = testAppModule.createNestApplication();
    httpService = testAppModule.get<HttpService>(HttpService);
    await app.init();
  });

  describe('root', () => {
    it('should return an "array of objects"', async () => {
      const response = await request(app.getHttpServer())
        .post('/photos')
        .send({ text: 'people' })
        .expect(201);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      );
    });
    it('should return 400', async () => {
      await request(app.getHttpServer())
        .post('/photos')
        .send()
        .expect(400);
    });
  });
});
