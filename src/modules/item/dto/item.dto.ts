export type ItemDTO = {
  id?: string;
  name: string;
  value: number;
  quantity: number;
  unity: string;
  boughtDate: Date;
  stock: boolean;
  categoryId?: string;
};
