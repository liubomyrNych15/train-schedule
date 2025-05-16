import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainEntity } from './train.entity';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { AuthModule } from '../auth';

@Module({
    imports: [
        AuthModule,        
        TypeOrmModule.forFeature([TrainEntity]),
    ],
    providers: [TrainsService],
    controllers: [TrainsController],
})

export class TrainsModule {}