import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    Query,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { TrainsService } from './trains.service';
import { CreateTrainDto, UpdateTrainDto } from './dto';
import { QueryTrainsDto } from './dto/query-trains.dto';

@UseGuards(JwtAuthGuard)
@Controller('trains')
export class TrainsController {
    constructor(private service: TrainsService) {}

    @Get()
    findAll(@Query() query: QueryTrainsDto) {
        return this.service.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateTrainDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() dto: UpdateTrainDto,
    ) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.service.remove(id);
    }
}