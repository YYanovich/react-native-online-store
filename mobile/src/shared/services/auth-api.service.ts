import { HttpFactoryService } from './http-factory.service';

export interface RegisterDto {
	email: string;
	fullName: string;
	phone: string;
	shippingAddress: string;
	password: string;
}

export interface LoginDto {
	email: string;
	password: string;
}

export interface VerifyDto {
	email: string;
	code: string;
}

export interface ForgotPasswordResponse {
	sent: boolean;
	message: string;
}

export interface VerifyResetCodeResponse {
	verified: boolean;
}

export interface ResetPasswordDto {
	email: string;
	code: string;
	newPassword: string;
	confirmPassword: string;
}

export interface ResetPasswordResponse {
	success: boolean;
	message: string;
}

export interface Tokens {
	access_token: string;
	refresh_token: string;
}

export type LoginResponse = Tokens | { verificationRequired: true };

export class AuthApiService {
	private httpFactory: HttpFactoryService;
	private httpService: ReturnType<HttpFactoryService['createHttpService']>;
	private authHttpService: ReturnType<
		HttpFactoryService['createAuthHttpService']
	>;
	//API for auth
	constructor() {
		this.httpFactory = new HttpFactoryService();
		this.httpService = this.httpFactory.createHttpService();
		this.authHttpService = this.httpFactory.createAuthHttpService();
	}

	async register(data: RegisterDto): Promise<void> {
		return this.httpService.post('/auth/register', data);
	}

	async sendVerification(email: string): Promise<{ sent: boolean }> {
		return this.httpService.post('/auth/send-verification', { email });
	}

	async verify(data: VerifyDto): Promise<Tokens> {
		return this.httpService.post('/auth/verify-email', data);
	}

	async login(data: LoginDto): Promise<LoginResponse> {
		return this.httpService.post('/auth/login', data);
	}

	async logout(): Promise<void> {
		return this.authHttpService.post('/auth/logout', {});
	}

	async profile(): Promise<{
		id: string;
		email: string;
		fullName?: string;
		verified: boolean;
	}> {
		return this.authHttpService.get('/auth/profile');
	}

	async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
		return this.httpService.post('/auth/forgot-password', { email });
	}

	async verifyResetCode(email: string, code: string): Promise<VerifyResetCodeResponse> {
		return this.httpService.post('/auth/verify-reset-code', { email, code });
	}

	async resetPassword(data: ResetPasswordDto): Promise<ResetPasswordResponse> {
		return this.httpService.post('/auth/reset-password', data);
	}
}

export const authApiService = new AuthApiService();
