import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePromoDto {
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
  @ApiProperty({ default: 'Название акции' })
  title: string;

  @IsString()
  @ApiProperty({ default: 'Описание акции' })
  text: string;
}
