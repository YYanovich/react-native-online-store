import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

/*
  generic middleware fabric method for checking
*/
export function createExistMiddleware<
	Delegate extends {
		findUnique: (args: { where: { id: string } }) => Promise<unknown>;
	},
>(delegate: Delegate) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		if (!id) return next();
		const entity = await delegate.findUnique({ where: { id } });
		if (!entity)
			throw new NotFoundException(`Item with id ${id} not found`);
		next();
	};
}

@Injectable()
export class ProductExistsMiddleware implements NestMiddleware {
	constructor(private readonly prisma: PrismaService) {}
	use = createExistMiddleware(this.prisma.product);
}

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
	constructor(private readonly prisma: PrismaService) {}
	use = createExistMiddleware(this.prisma.user);
}
