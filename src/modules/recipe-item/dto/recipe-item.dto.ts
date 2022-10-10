export type RecipeItemDTO = {
  id?: string;
  name: string;
  value: number;
  boughtDate: Date;
  categoryId: string | null;
  stock: boolean;
};
