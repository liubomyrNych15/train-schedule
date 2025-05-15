import { CookieOptions } from 'express';

export const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',  
    maxAge: 7 * 24 * 60 * 60 * 1000,  
};