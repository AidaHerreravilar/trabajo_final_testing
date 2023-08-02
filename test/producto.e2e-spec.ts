import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Producto } from '../src/producto/producto';
import * as request from 'supertest';

describe('ProductoController (e2e)', () => {
  let app: INestApplication;
  let productos: Producto[] = [];
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
  beforeEach(() => {
    productos = [
      new Producto('1', 'Producto 1'),
      new Producto('2', 'Producto 2'),
    ];
  });

  describe('/productos (GET)', () => {
    it('should return an array of products', async () => {
      const response = await request(app.getHttpServer())
        .get('/productos')
        .expect(200);
      expect(response.body).toBe(productos);
    });
  });

  describe('/productos/:id (GET)', () => {
    it('should return the product with the provided ID', async () => {
      const response = await request(app.getHttpServer())
        .get('/productos/1')
        .expect(200);
      expect(response.body).toBe(Producto[0]);
    });
    it('should return 404 if the product does not exist', async () => {
      await request(app.getHttpServer())
        .get('/productos/999')
        .expect(404);
    });
  });

  describe('/productos (POST)', () => {
    it('should create a new product', async () => {
      const newProduct = {
        id: '3',
        name: 'Nuevo Producto',
      };
      const response = await request(app.getHttpServer())
        .post('/productos')
        .send(newProduct)
        .expect(201);
      expect(response.body).toBe(newProduct);
    });
    it('should return 400 if invalid product data is provided', async () => {
      const invalidProduct = {};
      await request(app.getHttpServer())
        .post('/productos')
        .send(invalidProduct)
        .expect(400);
    });
  });

  describe('/productos/:id (PUT)', () => {
    it('should update the product with the provided ID', async () => {
      const updatedProduct = {
        id: '1',
        name: 'Producto Actualizado',
      };
      const response = await request(app.getHttpServer())
        .put('/productos/1')
        .send(updatedProduct)
        .expect(200);
      expect(response.body).toBe(updatedProduct);
    });
    it('should return 404 if the product does not exist', async () => {
      const updatedProduct = {
        id: '999',
        name: 'Producto Actualizado',
      };
      await request(app.getHttpServer())
        .put('/productos/999')
        .send(updatedProduct)
        .expect(404);
    });
  });
  
  describe('/productos/:id (DELETE)', () => {
    it('should delete the product with the provided ID', async () => {
      const response = await request(app.getHttpServer())
        .delete('/productos/1')
        .expect(200);
      expect(response.body).toBe(Producto[0]);
    });
    it('should return 404 if the product does not exist', async () => {
      await request(app.getHttpServer())
        .delete('/productos/999')
        .expect(404);
    });
  });
});