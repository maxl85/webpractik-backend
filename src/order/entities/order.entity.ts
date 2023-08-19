import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';

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

  // @OneToMany(() => ProductEntity, (product) => product.id)
  @ManyToMany(() => ProductEntity)
  @JoinColumn()
  products: ProductEntity[];

  @Column('int', { array: true })
  productSizes: number[];

  @Column('int', { array: true })
  quantities: number[];

  @Column()
  totalPrice: number;
}
