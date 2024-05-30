import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';



describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' })
      .expect(201)
      .expect('Registered successfully');
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .expect(200)
      .expect('Logged in successfully');
  });
});
