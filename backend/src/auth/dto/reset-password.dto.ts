import { IsEmail, IsNotEmpty, IsString, MinLength, Length } from 'class-validator';

export class ResetPasswordDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@Length(4, 4, { message: 'Code must be exactly 4 digits' })
	code: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8, { message: 'Password must be at least 8 characters' })
	newPassword: string;

	@IsString()
	@IsNotEmpty()
	confirmPassword: string;
}
