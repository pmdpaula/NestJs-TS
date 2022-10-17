export type RecipeDTO = {
  id?: string;
  name: string;
  description?: string;
  creationDate: Date;
  lastModificationDate?: Date;
  recipeItemId?: string[];
};
