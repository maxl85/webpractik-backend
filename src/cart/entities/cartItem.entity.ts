import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartEntity } from './cart.entity';

// @Entity('cart')
// export class CartEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   userIP: string;

//   @Column('int', { array: true })
//   productsId: number[];

//   @Column('int', { array: true })
//   productSizes: number[];

//   @Column()
//   quantity: number;

//   @Column()
//   totalPrice: number;
// }

@Entity('cartItem')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  subTotalPrice: number;

  @ManyToOne(() => ProductEntity, (product) => product.cartItem, { eager: true })
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItem, { eager: true })
  @JoinColumn()
  cart: CartEntity;
}
