import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CartEntity, ProductEntity]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
