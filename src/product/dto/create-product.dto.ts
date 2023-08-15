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

  @IsArray()
  @IsNumber({}, { each: true })
  sizes: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  prices: number[];

  @IsNumber()
  categoryId: number;
}
