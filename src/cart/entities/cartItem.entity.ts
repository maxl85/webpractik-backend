// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { CartEntity } from './cart.entity';


// @Entity('cartItem')
// export class CartItemEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   size: number;

//   @Column()
//   price: number;

//   @Column()
//   quantity: number;

//   @Column()
//   subTotalPrice: number;

//   @ManyToOne(() => ProductEntity, (product) => product.cartItem, { eager: true })
//   @JoinColumn()
//   product: ProductEntity;

//   @ManyToOne(() => CartEntity, (cart) => cart.cartItem, { eager: true })
//   @JoinColumn()
//   cart: CartEntity;
// }
