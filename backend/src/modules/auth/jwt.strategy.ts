import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: false,
        });
    }

    validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}