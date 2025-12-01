import { Controller, Get, Param } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';

@Controller('order-details')
export class OrderDetailsController {
	constructor(private readonly service: OrderDetailsService) {}

	@Get(':id')
	get(@Param('id') id: string) {
		return this.service.getById(id);
	}
}
