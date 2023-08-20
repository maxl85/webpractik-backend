import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemEntity } from './orderItem.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  payment: number;

  @OneToMany(() => OrderItemEntity, (item) => item.id)
  @JoinColumn()
  items: OrderItemEntity[];

  @Column()
  totalPrice: number;
}
