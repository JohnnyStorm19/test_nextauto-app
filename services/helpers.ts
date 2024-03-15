import { TFakeAutoData } from "@/models/TFakeData";

type TSalesCount = {
  [key: string]: number;
};

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
export const getAutoById = (autoData: TFakeAutoData, id: string) => {
  return autoData.find((auto) => auto.id === Number(id));
};

// хелперы для работы с продажами
export const sortMonths = (months: string[]) => {
  return months.sort((a, b) => {
    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });
};
export const getSalesByYear = (data: TFakeAutoData, year: string) => {
  let salesDate: string[] = [];
  let salesCount: TSalesCount = {};

  data.forEach((item) => {
    item.sales.forEach((sale) => {
      if (sale.date.includes(year)) {
        const date = new Date(sale.date);

        const monthName = date.toLocaleString("en-US", {
          month: "long",
        });

        monthName in salesCount
          ? salesCount[monthName]++
          : (salesCount[monthName] = 1);
        salesDate.push(sale.date);
      }
    });
  });
  return salesCount;
};
export const getChartData = (obj: TSalesCount) => {
  let labels = [];
  let numberOfSales = [];
  for (let key in obj) {
    labels.push(key);
    numberOfSales.push(obj[key]);
  }
  return { labels: sortMonths(labels), numberOfSales };
};
