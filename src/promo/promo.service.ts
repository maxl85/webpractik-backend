import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PromoEntity } from './entities/promo.entity';

@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(PromoEntity)
    private repository: Repository<PromoEntity>,
  ) {}

  async create(
    dto: CreatePromoDto,
    image: Express.Multer.File,
  ): Promise<PromoEntity> {
    return await this.repository.save({
      image: image.filename,
      title: dto.title,
      text: dto.text,
    });
  }

  async findAll(): Promise<PromoEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<PromoEntity> {
    return await this.repository.findOneBy({ id });
  }

  update(id: number, dto: UpdatePromoDto, image: Express.Multer.File) {
    console.log(dto)
    console.log(image)
    return `This action updates a #${id} promo`;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
