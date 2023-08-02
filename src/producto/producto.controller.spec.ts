import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { Producto } from './producto';
describe('ProductoController', () => {
  let controller: ProductoController;
  let service: ProductoService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoController],
      providers: [ProductoService],
    }).compile();
    controller = module.get<ProductoController>(ProductoController);
    service = module.get<ProductoService>(ProductoService);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('findAll', () => {
    it('should return an array of productos', () => {
      const productos: Producto[] = [
        new Producto('1', 'Producto 1'),
        new Producto('2', 'Producto 2'),
      ];
      jest.spyOn(service, 'findAll').mockReturnValue(productos);
      expect(controller.findAll()).toEqual(productos);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
  describe('findById', () => {
    it('should return the product with the provided ID', () => {
      const producto = new Producto('1', 'Producto 1');
      jest.spyOn(service, 'findById').mockReturnValue(producto);
      expect(controller.findById('1')).toEqual(producto);
      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(service.findById).toHaveBeenCalledWith('1');
    });
  });
  describe('create', () => {
    it('should create a new product', () => {
      const producto = new Producto('1', 'Producto 1');
      jest.spyOn(service, 'create').mockReturnValue(producto);
      expect(controller.create(producto)).toEqual(producto);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(producto);
    });
  });
  describe('update', () => {
    it('should update an existing product', () => {
      const updatedProducto = new Producto('1', 'Updated Producto');
      jest.spyOn(service, 'update').mockReturnValue(updatedProducto);
      expect(controller.update('1', updatedProducto)).toEqual(updatedProducto);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith('1', updatedProducto);
    });
    it('should return null if the product does not exist', () => {
      const nonExistentProductId = '999';
      const updatedProducto = new Producto('999', 'Updated Producto');
      jest.spyOn(service, 'update').mockReturnValue(null);
      expect(controller.update(nonExistentProductId, updatedProducto)).toBeNull();
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(nonExistentProductId, updatedProducto);
    });
  });
  describe('delete', () => {
    it('should delete an existing product', () => {
      const deletedProducto = new Producto('1', 'Deleted Producto');
      jest.spyOn(service, 'delete').mockReturnValue(deletedProducto);
      expect(controller.delete('1')).toEqual(deletedProducto);
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith('1');
    });
    it('should return null if the product does not exist', () => {
      const nonExistentProductId = '999';
      jest.spyOn(service, 'delete').mockReturnValue(null);
      expect(controller.delete(nonExistentProductId)).toBeNull();
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(nonExistentProductId);
    });
  });
});
