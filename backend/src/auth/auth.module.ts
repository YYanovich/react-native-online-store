import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.startegy';
import { EmailModule } from 'src/email/email.module';

@Module({
	imports: [
		ConfigModule,
		UserModule,
		EmailModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({}),
	],
	providers: [AuthService, AtStrategy, RtStrategy],
	controllers: [AuthController],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
