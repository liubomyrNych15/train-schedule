import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { JwtPayload } from './interfaces/fdil';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
    constructor() {
        super({
             jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                return req?.cookies?.refreshToken;    
                },
            ]),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: false,
        });
    }

    validate(payload: JwtPayload) {
        return { id: payload.sub, username: payload.username };
    }
}