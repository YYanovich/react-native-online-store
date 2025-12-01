import { HttpFactoryService } from './http-factory.service';
import { Product, ProductQueryParams } from '../types/product.types';

export interface PaginatedProducts {
	data: Product[];
	total_pages?: number;
	total_results?: number;
}

export class ProductService {
	private static readonly BASE_PATH = '/product';

	private static getHttp() {
		return new HttpFactoryService().createHttpService();
	}

	// get all products with optional filtering, sorting, pagination
	// params = query parameters (name, sortBy, skip, take)
	static async getProducts(
		params?: ProductQueryParams,
	): Promise<PaginatedProducts> {
		const http = this.getHttp();

		const res = await http.get<Product[] | PaginatedProducts>(
			this.BASE_PATH,
			{
				params,
			},
		);

		if (Array.isArray(res)) {
			return { data: res };
		}

		return res;
	}

	// get element by id
	static async getProductById(id: string): Promise<Product> {
		const http = this.getHttp();
		const res = await http.get<Product>(`${this.BASE_PATH}/${id}`);
		return res as unknown as Product;
	}
}
