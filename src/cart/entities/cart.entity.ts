import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItemEntity } from './cartItem.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userIP: string;

  @Column()
  totalPrice: number;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.id)
  @JoinColumn()
  cartItem: CartItemEntity[];
}
