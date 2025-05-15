import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Validation
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    // Response wrapper
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.use(cookieParser());                   

    const config = app.get(ConfigService);
    const port = config.get<number>('PORT') || 3000;

    await app.listen(port);
    console.log(`\n🚀 Server running on http://localhost:${port}`);
}

bootstrap();