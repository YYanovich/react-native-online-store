export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	inStock: number;
	imageUrl?: string;
	createdAt: string;
	updatedAt: string;
}

//query params for product filtering/sorting/pagination
export interface ProductQueryParams {
	name?: string;
	sortBy?: 'asc' | 'desc';
	skip?: number;
	take?: number;
}
