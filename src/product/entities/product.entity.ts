import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { CartItemEntity } from 'src/cart/entities/cartItem.entity';

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

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.id)
  @JoinColumn()
  cartItem: CartItemEntity[];
}
