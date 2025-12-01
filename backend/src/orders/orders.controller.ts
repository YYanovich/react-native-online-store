import {
	Controller,
	Post,
	Body,
	Param,
	Get,
	Patch,
	Delete,
	Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { QueryOrdersDto } from './dto/query-order.dto';
import { GetCurrentUserId } from '../auth/decorators';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	create(@Body() dto: CreateOrderDto) {
		return this.ordersService.createOrder(dto.userId);
	}

	@Get()
	getAll(@GetCurrentUserId() userId: string, @Query() query: QueryOrdersDto) {
		return this.ordersService.getOrders(userId, query);
	}

	@Get(':id')
	get(@Param('id') id: string) {
		return this.ordersService.getOrder(id);
	}

	@Post(':id/items')
	addItem(@Param('id') id: string, @Body() dto: AddOrderItemDto) {
		return this.ordersService.addItem(id, dto);
	}

	@Patch(':id/items/:itemId')
	updateItem(
		@Param('id') id: string,
		@Param('itemId') itemId: string,
		@Body() dto: UpdateOrderItemDto,
	) {
		return this.ordersService.updateItemQuantity(id, itemId, dto.quantity);
	}

	@Delete(':id/items/:itemId')
	removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
		return this.ordersService.removeItem(id, itemId);
	}
}
