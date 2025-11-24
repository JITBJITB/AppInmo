import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY_CAMBIAR_EN_PROD', // TODO: Move to env vars
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, rol: payload.rol };
    }
}
