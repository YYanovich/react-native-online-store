import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { RtGuard } from './guards/rt.guard';
import { GetCurrentUser, GetCurrentUserId } from './decorators';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { SendVerificationDto } from './dto/send-verification.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from '../common/decorators/public.decorator';
import { UserWithoutPassword } from './types';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Public()
	@Post('login')
	@HttpCode(HttpStatus.ACCEPTED)
	login(@Body() dto: LoginDTO) {
		return this.authService.login(dto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	logout(@GetCurrentUserId() userId: string) {
		return this.authService.logout(userId);
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@UseGuards(RtGuard)
	refreshTokens(
		@GetCurrentUserId() userId: string,
		@GetCurrentUser('refreshToken') refreshToken: string,
	) {
		return this.authService.refreshTokens(userId, refreshToken);
	}

	@Get('profile')
	getProfile(@GetCurrentUser() user: UserWithoutPassword) {
		return user;
	}

	@Public()
	@Post('send-verification')
	@HttpCode(HttpStatus.OK)
	sendVerification(@Body() dto: SendVerificationDto) {
		return this.authService.sendVerification(dto);
	}

	@Public()
	@Post('verify-email')
	@HttpCode(HttpStatus.OK)
	verifyEmail(@Body() dto: VerifyEmailDto) {
		return this.authService.verifyEmail(dto);
	}

	@Public()
	@Post('forgot-password')
	@HttpCode(HttpStatus.OK)
	forgotPassword(@Body() dto: ForgotPasswordDto) {
		return this.authService.forgotPassword(dto);
	}

	@Public()
	@Post('verify-reset-code')
	@HttpCode(HttpStatus.OK)
	verifyResetCode(@Body() dto: VerifyResetCodeDto) {
		return this.authService.verifyResetCode(dto);
	}

	@Public()
	@Post('reset-password')
	@HttpCode(HttpStatus.OK)
	resetPassword(@Body() dto: ResetPasswordDto) {
		return this.authService.resetPassword(dto);
	}
}
