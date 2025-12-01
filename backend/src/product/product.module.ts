import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductExistsMiddleware } from '../common/is-exist.middleware';

@Module({
	imports: [PrismaModule],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		//apply for every routes which have id
		consumer.apply(ProductExistsMiddleware).forRoutes('product/:id'); // GET /product/:id, PATCH /product/:id, DELETE /product/:id
	}
}
