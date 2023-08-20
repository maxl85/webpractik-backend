import { IsNumber } from 'class-validator';

export class AddCartDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  productSizeId: number;

  @IsNumber()
  quantity: number;
}
