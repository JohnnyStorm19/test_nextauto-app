import { Line } from "react-chartjs-2";
import styles from "./MyChart.module.css";
import fakeAutoData from "../../data/data.json";
import { getChartData, getSalesByYear } from "@/services/helpers";

const YEAR_OF_SALES = "2023";

const MyChart = () => {
  const salesObj = getSalesByYear(fakeAutoData, YEAR_OF_SALES);
  const chartData = getChartData(salesObj);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Всего 30 продаж. 22 сделаны в 2023-м, 8 продаж в 2024-м",
      },
    },
  };

  const labels = chartData.labels;
  const autoSales = chartData.numberOfSales;

  const data = {
    labels,
    datasets: [
      {
        label: "Продажи автомобилей за 2023-й год",
        data: autoSales,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.graph_container}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default MyChart;
