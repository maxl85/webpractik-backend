/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userName: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsNumber()
  payment: number;
}
