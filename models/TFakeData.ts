export type TFakeAutoData = {
  id: number;
  name: string;
  model: string | null;
  type: string;
  sales: {
    date: string;
    reseller: string;
  }[];
}[];
