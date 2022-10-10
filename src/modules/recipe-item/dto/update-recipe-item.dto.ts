import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeItemDto } from './create-recipe-item.dto';

export class UpdateRecipeItemDto extends PartialType(CreateRecipeItemDto) {}
