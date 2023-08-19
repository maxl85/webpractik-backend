import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userIP: string;

  @ManyToOne(() => ProductEntity, (product) => product.cart, { eager: true })
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

// @Entity('cart')
// export class CartEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   userIP: string;

//   @Column()
//   totalPrice: number;

//   @OneToMany(() => CartItemEntity, (cartItem) => cartItem.id)
//   @JoinColumn()
//   cartItem: CartItemEntity[];
// }
