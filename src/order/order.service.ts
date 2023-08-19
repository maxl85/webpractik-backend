import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/orderItem.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,

    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async create(dto: CreateOrderDto, ip: string): Promise<OrderEntity> {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product')
      .where('cart.userIP = :userIP', { userIP: ip })
      .getMany();

    if (!cart) {
      throw new BadRequestException(`Добавьте товары в корзину`);
    }

    const order = new OrderEntity();
    order.userName = dto.userName;
    order.phone = dto.phone;
    order.address = dto.address;
    order.payment = dto.payment;
    order.items = [];
    order.totalPrice = 0;
    const newOrder = await this.orderRepository.save(order);

    let totalPrice = 0;
    cart.forEach(async (item) => {
      const orderItem = new OrderItemEntity();
      orderItem.product = item.product;
      orderItem.productSizeId = item.productSizeId;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      orderItem.totalPrice = item.totalPrice;
      orderItem.order = newOrder;
      totalPrice = totalPrice + item.totalPrice;
      await this.orderItemRepository.save(orderItem);
    });

    const toUpdate = await this.orderRepository.findOneBy({ id: newOrder.id });
    toUpdate.totalPrice = totalPrice;
    return this.orderRepository.save(toUpdate);
  }
}
