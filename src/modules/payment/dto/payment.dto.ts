export type PaymentDTO = {
  id?: string;
  value: number;
  description?: string;
  paymentDate: Date;
  projectId: string;
};
