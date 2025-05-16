import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth';
import * as Joi from 'joi';
import { TrainsModule } from './modules/trains';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validationSchema: Joi.object({
                PORT: Joi.number().default(3000),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().default(5432),
                DB_USER: Joi.string().required(),
                DB_PASS: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().default('3600s'),
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],           
            inject: [ConfigService],         
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),      
                username: config.get<string>('DB_USER'),
                password: config.get<string>('DB_PASS'),
                database: config.get<string>('DB_NAME'),
                autoLoadEntities: true,
                synchronize: true,         
            }),
        }),
        AuthModule,
        TrainsModule,
    ],
})

export class AppModule {}