import { IsEnum, IsOptional, IsString } from "class-validator";

import { SortOrder, TrainSortField } from "../enums/train-sorting.enum";

export class QueryTrainsDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(TrainSortField)
    sort?: TrainSortField;

    @IsOptional()
    @IsEnum(SortOrder)
    order?: SortOrder;
}