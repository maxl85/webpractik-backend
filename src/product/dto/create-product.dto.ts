/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsString()
  name: string = 'Название пиццы';

  @IsString()
  description: string = 'Состав';

  // @IsArray()
  // @IsNumber({}, { each: true })
  // sizes: number[];
  @IsString()
  sizes: string = '20,30,40';

  // @IsArray()
  // @IsNumber({}, { each: true })
  // prices: number[];
  @IsString()
  prices: string = '400,599,700';

  @IsNumber()
  categoryId: number;
  // @IsString()
  // categoryId: string = '1';
}
