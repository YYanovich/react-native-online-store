import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { SendVerificationDto } from './dto/send-verification.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import {
	Tokens,
	VerificationSent,
	RegisterResult,
	UserWithVerification,
	UserWithHashedRt,
	UserWithoutPassword,
	ResetCodeSent,
	ResetCodeVerified,
	PasswordResetResult,
	UserWithResetPassword,
} from './types';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly config: ConfigService,
		private readonly emailService: EmailService,
	) {}

	async register(dto: RegisterDto): Promise<RegisterResult> {
		if (dto.confirmPassword !== undefined && dto.confirmPassword !== dto.password) {
			throw new BadRequestException('Passwords do not match');
		}

		const hashedPassword = await this.hashPassword(dto.password);

		try {
			const user = await this.userService.create({
				email: dto.email,
				password: hashedPassword,
				fullName: dto.fullName,
				phoneNumber: dto.phoneNumber ?? dto.phone, 
				shippingAddress: dto.shippingAddress,
			});
			return { registered: true };
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new ConflictException('Email already in use');
			}
			throw new InternalServerErrorException();
		}
	}

	private async hashPassword(password: string) {
		return bcrypt.hash(password, 10);
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<UserWithoutPassword> {
		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException('Incorrect email or password');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException('Incorrect email or password');
		}

		const { password: _password, ...result } = user;
		return result as UserWithoutPassword;
	}

	async login(
		dto: LoginDTO,
	): Promise<Tokens | { verificationRequired: true }> {
		const user = await this.validateUser(dto.email, dto.password);
		if (!user.verified) {
			// first login sending verifying code to confirm email
			const { code, expiresAt } = this.generateVerificationData();
			await this.userService.update(user.id, {
				verificationCode: code,
				verificationCodeExpiresAt: expiresAt,
			});
			await this.emailService.sendVerificationCode(user.email, code);
			return { verificationRequired: true };
		}
		const tokens = await this.getTokens(user.id, user.email, user.role);
		await this.updateRtHash(user.id, tokens.refresh_token);
		return tokens;
	}

	async logout(userId: string) {
		const user = await this.userService.findById(userId);
		if (user) {
			await this.userService.update(user.id, { hashedRt: null });
		}
	}

	async refreshTokens(userId: string, rt: string): Promise<Tokens> {
		const user = (await this.userService.findById(
			userId,
		)) as UserWithHashedRt;
		const userHashedRt = user?.hashedRt;

		if (!user || !userHashedRt)
			throw new UnauthorizedException('Access denied');

		const rtMatches = await bcrypt.compare(rt, userHashedRt);
		if (!rtMatches) throw new UnauthorizedException('Access denied');

		const tokens = await this.getTokens(user.id, user.email, user.role);
		await this.updateRtHash(user.id, tokens.refresh_token);
		return tokens;
	}

	private async updateRtHash(userId: string, rt: string) {
		const hash = await this.hashPassword(rt);
		await this.userService.update(userId, { hashedRt: hash });
	}

	private async getTokens(
		userId: string,
		email: string,
		role: string,
	): Promise<Tokens> {
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
					role,
				},
				{
					secret: this.config.get<string>('JWT_SECRET'),
					expiresIn: '15m',
				},
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
					role,
				},
				{
					secret: this.config.get<string>('JWT_REFRESH_SECRET'),
					expiresIn: '7d',
				},
			),
		]);

		return {
			access_token: at,
			refresh_token: rt,
		};
	}

	// email verification logic
	private generateVerificationData() {
		// 4 digits code
		const code = Math.floor(1000 + Math.random() * 9000).toString();
		const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min
		return { code, expiresAt };
	}

	async sendVerification(
		dto: SendVerificationDto,
	): Promise<VerificationSent> {
		const user = await this.userService.findByEmail(dto.email);
		if (!user) throw new NotFoundException('User not found');
		if (user.verified)
			throw new BadRequestException('Email already verified');

		const { code, expiresAt } = this.generateVerificationData();
		await this.userService.update(user.id, {
			verificationCode: code,
			verificationCodeExpiresAt: expiresAt,
		});
		await this.emailService.sendVerificationCode(user.email, code);
		return { sent: true };
	}
	//checking is user verified if not return error if yes return jwt tokens and change data in db to verified=true, verCode=null, verCodeExp=null
	async verifyEmail(dto: VerifyEmailDto): Promise<Tokens> {
		const user = (await this.userService.findByEmail(
			dto.email,
		)) as UserWithVerification;
		if (!user) throw new NotFoundException('User not found');
		if (user.verified)
			throw new BadRequestException('Email already verified');

		const storedCode = user.verificationCode;
		const expiresAt = user.verificationCodeExpiresAt;
		if (!storedCode || !expiresAt)
			throw new BadRequestException('No verification in progress');
		if (storedCode !== dto.code)
			throw new BadRequestException('Invalid code');
		if (new Date(expiresAt) < new Date())
			throw new BadRequestException('Code expired');

		await this.userService.update(user.id, {
			verified: true,
			verificationCode: null,
			verificationCodeExpiresAt: null,
		});

		const tokens = await this.getTokens(user.id, user.email, user.role);
		await this.updateRtHash(user.id, tokens.refresh_token);
		return tokens;
	}

	// Password reset logic
	async forgotPassword(dto: ForgotPasswordDto): Promise<ResetCodeSent> {
		const user = await this.userService.findByEmail(dto.email);
		if (!user) {
			throw new NotFoundException('User with this email does not exist');
		}

		const { code, expiresAt } = this.generateVerificationData();
		await this.userService.update(user.id, {
			resetPasswordCode: code,
			resetPasswordCodeExpiresAt: expiresAt,
		});

		await this.emailService.sendPasswordResetCode(user.email, code);

		return {
			sent: true,
			message: 'Password reset code has been sent to your email',
		};
	}

	async verifyResetCode(dto: VerifyResetCodeDto): Promise<ResetCodeVerified> {
		const user = (await this.userService.findByEmail(
			dto.email,
		)) as UserWithResetPassword | null;

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const storedCode = user.resetPasswordCode;
		const expiresAt = user.resetPasswordCodeExpiresAt;

		if (!storedCode || !expiresAt) {
			throw new BadRequestException('No password reset in progress');
		}

		if (storedCode !== dto.code) {
			throw new BadRequestException('Invalid reset code');
		}

		if (new Date(expiresAt) < new Date()) {
			throw new BadRequestException('Reset code has expired');
		}

		return { verified: true };
	}

	async resetPassword(dto: ResetPasswordDto): Promise<PasswordResetResult> {
		if (dto.newPassword !== dto.confirmPassword) {
			throw new BadRequestException('Passwords do not match');
		}

		const user = (await this.userService.findByEmail(
			dto.email,
		)) as UserWithResetPassword | null;

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const storedCode = user.resetPasswordCode;
		const expiresAt = user.resetPasswordCodeExpiresAt;

		if (!storedCode || !expiresAt) {
			throw new BadRequestException('No password reset in progress');
		}

		if (storedCode !== dto.code) {
			throw new BadRequestException('Invalid reset code');
		}

		if (new Date(expiresAt) < new Date()) {
			throw new BadRequestException('Reset code has expired');
		}

		const hashedPassword = await this.hashPassword(dto.newPassword);

		await this.userService.update(user.id, {
			password: hashedPassword,
			resetPasswordCode: null,
			resetPasswordCodeExpiresAt: null,
		});

		return {
			success: true,
			message: 'Password has been reset successfully',
		};
	}
}
