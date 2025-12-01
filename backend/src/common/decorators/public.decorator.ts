import { SetMetadata } from '@nestjs/common';

//using for public endpoints
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
