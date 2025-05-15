import {
    Controller,
    Post,
    Body,
    UseGuards,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_OPTIONS } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

    @Post('register')
    signup(@Body() registerDto: AuthCredentialsDto) {
        return this.authService.signup(registerDto);
    }
    
    @Post('login')
    async login(
        @Body() loginDto: AuthCredentialsDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { accessToken, refreshToken } = await this.authService.login(loginDto);
        res.cookie('refreshToken', refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
        return { accessToken };
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(
        @CurrentUser('id') userId: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { accessToken, refreshToken } =
        await this.authService.refreshTokens(userId, res.req.cookies.refreshToken);
        res.cookie('refreshToken', refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
        
        return { accessToken };
    }

    @UseGuards(JwtRefreshGuard)
    @Post('logout')
    logout(
        @CurrentUser('id') userId: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        this.authService.logout(userId);
        res.clearCookie('refreshToken', { path: '/' });
    }
}