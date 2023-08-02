// producto.service.ts
import { Injectable } from '@nestjs/common';
import { Producto } from './producto';

@Injectable()
export class ProductoService {
  private productos: Producto[] = [];
  findAll(): Producto[] {
    return this.productos;
  }
  findById(id: string): Producto {
    return this.productos.find((producto) => producto.id === id);
  }
  create(producto: Producto): Producto {
    this.productos.push(producto);
    return producto;
  }
  update(id: string, producto: Producto): Producto {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.productos[index] = producto;
      return producto;
    }
    return null;
  }
  delete(id: string): Producto {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      return this.productos.splice(index, 1)[0];
    }
    return null;
  }
}
