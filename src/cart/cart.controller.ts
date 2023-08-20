import { Controller, Get, Post, Body, Param, Delete, Ip } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/add-cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  add(@Body() dto: AddCartDto, @Ip() ip: string) {
    return this.cartService.add(dto, ip);
  }

  @Post('/reduce/:id')
  reduce(@Param('id') id: string, @Ip() ip: string) {
    return this.cartService.reduce(+id, ip);
  }

  @Get()
  findAll(@Ip() ip: string) {
    return this.cartService.findAll(ip);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cartService.delete(+id);
  }
}
