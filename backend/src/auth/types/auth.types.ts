export type Tokens = {
	access_token: string;
	refresh_token: string;
};

export type VerificationSent = {
	sent: boolean;
};

export type RegisterResult = {
	registered: true;
};

export type ResetCodeSent = {
	sent: boolean;
	message: string;
};

export type ResetCodeVerified = {
	verified: boolean;
};

export type PasswordResetResult = {
	success: boolean;
	message: string;
};

export type UserWithVerification = {
	id: string;
	email: string;
	verified: boolean;
	verificationCode: string | null;
	verificationCodeExpiresAt: Date | null;
	role: string;
};

export type UserWithResetPassword = {
	id: string;
	email: string;
	password: string;
	resetPasswordCode: string | null;
	resetPasswordCodeExpiresAt: Date | null;
};

export type UserWithHashedRt = {
	id: string;
	email: string;
	verified: boolean;
	role: string;
	hashedRt: string | null;
};

export type UserWithoutPassword = {
	id: string;
	email: string;
	verified: boolean;
	role: string;
};
