import { IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  productSizeId: number;

  @IsNumber()
  quantity: number;
}
