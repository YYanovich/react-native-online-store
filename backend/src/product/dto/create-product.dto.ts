import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
} from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNumber()
	@IsNotEmpty()
	price: number;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	category: string;

	@IsInt()
	@IsNotEmpty()
	inStock: number;

	@IsUrl()
	@IsOptional()
	imageUrl?: string;
}
