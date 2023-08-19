import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity('orderItem')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items, { eager: true })
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItem, { eager: true })
  @JoinColumn()
  product: ProductEntity;

  @Column()
  productSizeId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  totalPrice: number;
}
