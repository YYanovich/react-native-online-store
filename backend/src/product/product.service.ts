import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createProductDto: CreateProductDto) {
		return this.prisma.product.create({
			data: createProductDto,
		});
	}

	async findAll(query: QueryProductsDto) {
		const where = query.name
			? {
					name: {
						contains: query.name, //what need for seaarch
						mode: 'insensitive' as const, //ignor register (A = a)
					},
				}
			: {}; //if name is empty - where is empty object, no filter

		const orderBy = query.sortBy //sorting
			? { price: query.sortBy } // price: asc or price: desc (increase, decrease)
			: undefined;

		//db request
		return this.prisma.product.findMany({
			where,
			orderBy,
			skip: query.skip,
			take: query.take,
		});
	}

	async findOne(id: string) {
		return this.prisma.product.findUnique({
			where: { id },
		});
	}

	async update(id: string, updateProductDto: UpdateProductDto) {
		return this.prisma.product.update({
			where: { id },
			data: updateProductDto,
		});
	}

	async remove(id: string) {
		return this.prisma.product.delete({
			where: { id },
		});
	}
}
