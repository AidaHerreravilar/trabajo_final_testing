import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}
  @Get()
  findAll(): Producto[] {
    return this.productoService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string): Producto {
    return this.productoService.findById(id);
  }
  @Post()
  create(@Body() producto: Producto): Producto {
    return this.productoService.create(producto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() producto: Producto): Producto {
    return this.productoService.update(id, producto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Producto {
    return this.productoService.delete(id);
  }
}
