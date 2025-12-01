import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(config: ConfigService) {
		const refreshSecret = config.get<string>('JWT_REFRESH_SECRET');
		if (!refreshSecret) {
			throw new Error('JWT_REFRESH_SECRET is not configured');
		}
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //instruction to find a token from request
			secretOrKey: refreshSecret, //which token to check
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: any) { //check is token valid or not
		const refreshToken = req
			.get('authorization')
			?.replace('Bearer', '')
			.trim();

		if (!refreshToken) {
			throw new UnauthorizedException('Refresh token incorrect');
		}

		return {
			...payload,
			refreshToken, //returning refresh token to compare in rt.guard
		};
	}
}
