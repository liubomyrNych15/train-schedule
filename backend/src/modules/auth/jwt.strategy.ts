import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './interfaces/fdil';

@Injectable()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private config: ConfigService) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get<string>('JWT_SECRET'),
        ignoreExpiration: false,
        });
    }

    validate(payload: JwtPayload): { id: string; username: string } {
        return { id: payload.sub, username: payload.username };
    }
}