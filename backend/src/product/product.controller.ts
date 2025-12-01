import {
	Controller,
	Get,
	Query,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@Roles(Role.ADMIN)
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Get()
	@Public()
	findAll(@Query() query: QueryProductsDto) {
		return this.productService.findAll(query);
	}

	@Get(':id')
	@Public()
	findOne(@Param('id') id: string) {
		return this.productService.findOne(id);
	}

	@Patch(':id')
	@Roles(Role.ADMIN)
	update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto,
	) {
		return this.productService.update(id, updateProductDto);
	}

	@Delete(':id')
	@Roles(Role.ADMIN)
	remove(@Param('id') id: string) {
		return this.productService.remove(id);
	}
}
