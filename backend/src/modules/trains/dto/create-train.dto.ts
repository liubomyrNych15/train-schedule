import { IsString, IsDateString } from 'class-validator';

export class CreateTrainDto {
    @IsString() 
    name: string;

    @IsString() 
    from: string;

    @IsString() 
    to: string;

    @IsDateString() 
    departure: string;

    @IsDateString() 
    arrival: string;
}