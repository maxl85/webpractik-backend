import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { OrderItemEntity } from 'src/order/entities/orderItem.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int', { array: true })
  sizes: number[];

  @Column('int', { array: true })
  prices: number[];

  @ManyToOne(() => CategoryEntity, (category) => category.products, { eager: true })
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany(() => CartEntity, (cart) => cart.id)
  @JoinColumn()
  cart: CartEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.id)
  @JoinColumn()
  orderItem: OrderItemEntity[];
}
