import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from 'src/product/entities/product.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async addToCart(dto: CreateCartDto, ip: string): Promise<CartEntity> {
    const cartItem = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product')
      .where('cart.userIP = :userIP', { userIP: ip })
      .andWhere('cart.productSizeId = :productSizeId', { productSizeId: dto.productSizeId })
      .andWhere('cart.productId = :productId', { productId: dto.productId })
      .getOne();

    const product = await this.productRepository.findOneBy({ id: dto.productId });

    if (!cartItem) {
      return this.cartRepository.save({
        userIP: ip,
        product: product,
        productSizeId: dto.productSizeId,
        quantity: 1,
        totalPrice: product.prices[dto.productSizeId],
      });
    } else {
      cartItem.quantity = cartItem.quantity + 1;
      cartItem.totalPrice = cartItem.totalPrice + product.prices[dto.productSizeId];
      console.log(cartItem)
      return this.cartRepository.save(cartItem);
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
