import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { RolesGuard } from './common/guards/roles.guard';
import { AtGuard } from './auth/guards/at.guard';
import { PaymentsModule } from './payments/payments.module';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		UserModule,
		ConfigModule.forRoot(),
		ProductModule,
		OrdersModule,
		OrderDetailsModule,
		PaymentsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
