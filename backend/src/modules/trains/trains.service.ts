import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from './train.entity';
import { CreateTrainDto, UpdateTrainDto } from './dto';

@Injectable()
export class TrainsService {
    constructor(
        @InjectRepository(Train)
        private repo: Repository<Train>,
    ) {}

    create(dto: CreateTrainDto) {
        const train = this.repo.create(dto);
        return this.repo.save(train);
    }

    findAll(query: any) {
        const qb = this.repo.createQueryBuilder('train');
        if (query.search) {
        qb.where('train.name ILIKE :search', { search: `%${query.search}%` });
        }
        return qb.orderBy(`train.${query.sort || 'id'}`, query.order || 'ASC').getMany();
    }

    async findOne(id: string) {
        const train = await this.findOne(id);
        if (!train) throw new NotFoundException('Train not found');
        return train;
    }

    async update(id: string, dto: UpdateTrainDto) {
        const train = await this.findOne(id);
        Object.assign(train, dto);
        return this.repo.save(train);
    }

    async remove(id: string) {
        const train = await this.findOne(id);
        return this.repo.remove(train);
    }
}