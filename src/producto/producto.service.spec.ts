import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { Producto } from './producto';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    //devuelve una matriz vacía si no existen productos
    it('should return an empty array if no products exist', () => {
      expect(service.findAll()).toEqual([]);
    });
    //tiene que devolver una serie de productos
    it('should return an array of productos', () => {
      const productos: Producto[] = [
        new Producto('1', 'Producto 1'),
        new Producto('2', 'Producto 2'),
      ];
      service['productos'] = productos;
      expect(service.findAll()).toEqual(productos);
    });
  });

  describe('findById', () => {
    beforeEach(() => {
      const productos: Producto[] = [
        new Producto('1', 'Producto 1'),
        new Producto('2', 'Producto 2'),
      ];
      service['productos'] = productos;
    });
    //va a devolver nulo si no existe ningún producto con la ID proporcionada
    it('should return null if no product with the provided ID exists', () => {
      expect(service.findById('3')).toBeUndefined();
    });
    // el producto con la identificación proporcionada
    it('should return the product with the provided ID', () => {
      expect(service.findById('1')).toEqual(new Producto('1', 'Producto 1'));
    });
  });

  describe('create', () => {
    //tiene que crear un nuevo producto
    it('should create a new product', () => {
      const producto = new Producto('1', 'Producto 1');
      expect(service.create(producto)).toEqual(producto);
      expect(service['productos']).toContainEqual(producto);
    });
  });

  describe('update', () => {
    //me devuelve nulo si el producto no existe
    it('should return null if the product does not exist', () => {
      const nonExistentProductId = '999';
      const updatedProducto = new Producto('999', 'Updated Producto');
      expect(service.update(nonExistentProductId, updatedProducto)).toBeNull();
    });
    //debe actualizar un producto existente
    it('should update an existing product', () => {
      const existingProductId = '1';
      const existingProducto = new Producto(existingProductId, 'Producto 1');
      const updatedProducto = new Producto(existingProductId, 'Updated Producto');
      service['productos'] = [existingProducto];
      expect(service.update(existingProductId, updatedProducto)).toEqual(updatedProducto);
      expect(service['productos']).toContainEqual(updatedProducto);
    });
  });

  describe('delete', () => {
    //devuelve nulo si el producto no existe
    it('should return null if the product does not exist', () => {
      const nonExistentProductId = '999';
      expect(service.delete(nonExistentProductId)).toBeNull();
    });
    //elimina un producto existente
    it('should delete an existing product', () => {
      const existingProductId = '1';
      const existingProducto = new Producto(existingProductId, 'Producto 1');
      service['productos'] = [existingProducto];
      expect(service.delete(existingProductId)).toEqual(existingProducto);
      expect(service['productos']).not.toContainEqual(existingProducto);
    });
  });
});
