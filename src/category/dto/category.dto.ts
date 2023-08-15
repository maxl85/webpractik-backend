/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  name: string = 'все';
}
