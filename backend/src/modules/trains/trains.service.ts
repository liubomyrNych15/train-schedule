import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }              from '@nestjs/typeorm';
import { Repository, ILike }            from 'typeorm';

import { TrainEntity } from './train.entity';
import { CreateTrainDto }               from './dto/create-train.dto';
import { UpdateTrainDto }               from './dto/update-train.dto';
import { QueryTrainsDto } from './dto/query-trains.dto';
import { SortOrder, TrainSortField } from './enums/train-sorting.enum';

@Injectable()
export class TrainsService {
    constructor(
        @InjectRepository(TrainEntity)
        private readonly repo: Repository<TrainEntity>,
    ) {}

    async create(dto: CreateTrainDto): Promise<TrainEntity> {
        const exists = await this.repo.findOne({
            where: {
                name: dto.name,
                from: dto.from,
                to: dto.to,
            },
        });

        if (exists) {
            throw new ConflictException(
                `Train "${dto.name}" from "${dto.from}" to "${dto.to}" already exists.`,
            );
        }

        const train = this.repo.create(dto);
        return this.repo.save(train);
    }

    async findAll({
        search,
        sort  = TrainSortField.DEPARTURE,
        order = SortOrder.ASC,
    }: QueryTrainsDto): Promise<TrainEntity[]> {
        const where = search
        ? [
            { name: ILike(`%${search}%`) },
            { from: ILike(`%${search}%`) },
            { to:   ILike(`%${search}%`) },
            ]
        : {};

        return this.repo.find({
            where,
            order: { [sort]: order },
        });
    }

    async findOne(id: string): Promise<TrainEntity> {
        const train = await this.repo.findOne({ where: { id } });
        if (!train) throw new NotFoundException(`Train with id ${id} not found`);
        return train;
    }

    async update(id: string, dto: UpdateTrainDto): Promise<TrainEntity> {
        const train = await this.findOne(id);
        Object.assign(train, dto);
        return this.repo.save(train);
    }

    async remove(id: string): Promise<void> {
        const train = await this.findOne(id);
        await this.repo.remove(train);
    }
}