export type ProjectDTO = {
  id?: string;
  name: string;
  deliveryData: Date;
  deliveryMode: string;
  description?: string;
  extraDescription?: string;
  extraValue?: number;
  isActive: boolean;
  soldValue: number;
  eventTypeId: string;
  recipeId?: string;
  clientId?: string;
  plannerId?: string;
};
