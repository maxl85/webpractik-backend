import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CategoryDto): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.name = dto.name;
    return this.repository.save(category);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: CategoryDto): Promise<CategoryEntity> {
    const toUpdate = await this.repository.findOneBy({ id });
    toUpdate.name = dto.name;
    return this.repository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
