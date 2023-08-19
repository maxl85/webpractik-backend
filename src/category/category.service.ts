import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateCategoryDto,
    image: Express.Multer.File,
  ): Promise<CategoryEntity> {
    return this.repository.save({
      image: image.filename,
      name: dto.name,
    });
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
    image: Express.Multer.File,
  ): Promise<CategoryEntity> {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/category/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
