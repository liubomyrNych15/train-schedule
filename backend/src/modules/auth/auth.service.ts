import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../users/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {}

    private async hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    private async compareHash(data: string, hash: string) {
        return bcrypt.compare(data, hash);
    }

    async signup(dto: AuthCredentialsDto) {
        const { username, password } = dto;
        const exists = await this.usersRepo.findOne({ where: { username } });
        if (exists) {
            throw new BadRequestException('Username already exists');
        }

        const passwordHash = await this.hashData(password);
        const user = this.usersRepo.create({ username, passwordHash });
        await this.usersRepo.save(user);

        return { id: user.id, username: user.username };
    }

    async login(dto: AuthCredentialsDto) {
        const { username, password } = dto;
        const user = await this.usersRepo.findOne({ where: { username } });
        if (!user || !(await this.compareHash(password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.getTokens(user.id, user.username);

        user.refreshTokenHash = await this.hashData(tokens.refreshToken);
        await this.usersRepo.save(user);

        return tokens;
    }

    private async getTokens(userId: string, username: string) {
        const payload = { sub: userId, username };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        return { accessToken, refreshToken };
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (
            !user ||
            !user.refreshTokenHash ||
            !(await this.compareHash(refreshToken, user.refreshTokenHash))
        ) {
        throw new UnauthorizedException('Invalid refresh token');
        }

        const tokens = await this.getTokens(user.id, user.username);

        user.refreshTokenHash = await this.hashData(tokens.refreshToken);
        await this.usersRepo.save(user);

        return tokens;
    }

    async logout(userId: string) {
        await this.usersRepo.update(userId, { refreshTokenHash: null });
    }
}
