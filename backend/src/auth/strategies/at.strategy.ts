import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
	sub: string;
	email: string;
	role: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(config: ConfigService) {
		const accessSecret = config.get<string>('JWT_SECRET');
		if (!accessSecret) {
			throw new InternalServerErrorException(
				'JWT_SECRET is not configured',
			);
		}
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: accessSecret,
		});
	}

	validate(payload: JwtPayload) {
		// Повертаємо об'єкт з правильною структурою для request.user
		return {
			id: payload.sub,
			email: payload.email,
			role: payload.role,
		};
	}
}
