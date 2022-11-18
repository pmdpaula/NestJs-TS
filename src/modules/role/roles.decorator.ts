import { SetMetadata } from '@nestjs/common';
import { RoleDef } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleDef[]) => SetMetadata(ROLES_KEY, roles);
