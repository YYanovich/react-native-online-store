import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

/*
 @Roles(Role.ADMIN) only admin
 @Roles(Role.USER, Role.ADMIN) users and admin
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
