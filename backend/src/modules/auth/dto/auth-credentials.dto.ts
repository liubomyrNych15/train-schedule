import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @Matches(/(?:(?=.*\d)(?=.*[A-Z])(?=.*\W)).*/, {
        message: 'Password too weak (need uppercase, number and special char)',
    })
    password: string;
}