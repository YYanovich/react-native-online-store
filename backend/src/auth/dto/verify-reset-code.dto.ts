import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyResetCodeDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@Length(4, 4, { message: 'Code must be exactly 4 digits' })
	code: string;
}
