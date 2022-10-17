// export type RecipeItemDTO = {
//   id?: string;
//   name: string;
//   value: number;
//   boughtDate: Date;
//   categoryId: string | null;
//   stock: boolean;
// };

export type RecipeItemDTO = {
  id?: string;
  quantity: number;
  value?: number;
  observation?: string;
  itemId: string;
  recipeId?: string[];
};
