import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export class QueryProductsDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsEnum(SortOrder)
	sortBy?: SortOrder;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(0)
	skip?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	take?: number;
}
