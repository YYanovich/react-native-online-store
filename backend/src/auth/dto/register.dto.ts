import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  ValidateIf,
} from 'class-validator';


export class RegisterDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	password: string;

	@IsString()
	@IsOptional()
	fullName?: string;

	@IsString()
	@IsOptional()
	phoneNumber?: string; 

	@IsString()
	@IsOptional()
	phone?: string;

	@IsString()
	@IsOptional()
	shippingAddress?: string;

	@IsString()
	@ValidateIf((o) => o.password !== undefined)
	confirmPassword?: string;
}
