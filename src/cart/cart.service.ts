import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { ProductEntity } from 'src/product/entities/product.entity';
import { AddCartDto } from './dto/add-cart.dto';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async add(dto: AddCartDto, ip: string): Promise<CartEntity> {
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
        price: product.prices[dto.productSizeId],
        totalPrice: product.prices[dto.productSizeId],
      });
    } else {
      cartItem.quantity = cartItem.quantity + 1;
      cartItem.totalPrice = cartItem.totalPrice + cartItem.price;
      return this.cartRepository.save(cartItem);
    }
  }

  async reduce(id: number, ip: string): Promise<CartEntity> {
    const cartItem = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product')
      .where('cart.userIP = :userIP', { userIP: ip })
      .andWhere('cart.id = :id', { id })
      .getOne();

    if (!cartItem) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    } else {
      if (cartItem.quantity === 1) {
        return this.cartRepository.save(cartItem);
      } else {
        cartItem.quantity = cartItem.quantity - 1;
        cartItem.totalPrice = cartItem.totalPrice - cartItem.price;
        return this.cartRepository.save(cartItem);
      }
    }
  }

  async findAll(ip: string): Promise<CartEntity[]> {
    return this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product')
      .where('cart.userIP = :userIP', { userIP: ip })
      .orderBy('cart.id', 'ASC')
      .getRawMany();
  }

  delete(id: number): Promise<DeleteResult> {
    return this.cartRepository.delete(id);
  }
}
