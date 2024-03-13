import { TFakeAutoData } from "@/models/TFakeData";

export const getAllMarks = (autoData: TFakeAutoData) => {
  const marks = autoData.map((auto) => auto.name);
  return Array.from(new Set(marks));
};
export const getAllModels = (autoData: TFakeAutoData) => {
  const models = autoData.map((auto) => auto.model);
  return Array.from(new Set([...models]));
};
export const getAllTypes = (autoData: TFakeAutoData) => {
  const types = autoData.map((auto) => auto.type);
  return Array.from(new Set(types));
};
export const getResellers = (autoData: TFakeAutoData) => {
  const resellers = autoData
    .map((auto) => auto.sales)
    .map((sales) => {
      const reseller = sales.map((sale) => sale.reseller);
      return reseller;
    })
    .flat(1);
  return Array.from(new Set(resellers));
};
