import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

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

  async update(id: number, dto: UpdatePromoDto, image: Express.Multer.File) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.text) {
      toUpdate.text = dto.text;
    }
    if (dto.title) {
      toUpdate.title = dto.title;
    }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/promo/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }
    return await this.repository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
