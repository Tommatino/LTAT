import styles from "./statisticschart.module.scss";
import useUserData from "../../Hooks/useUserLogin.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAlcoholData from "../../Hooks/useAlcoholData.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function StatisticsChart() {
  const { getAlcoholData } = useAlcoholData();
  const [alcoChartData, setAlcoChartData] = useState([]);

  useEffect(() => {
    const getAlcoDays = async () => {
      try {
        const data = await getAlcoholData();

        setAlcoChartData(mappedData(data));
      } catch (err) {
        console.log(err);
      }
    };
    getAlcoDays();
  }, []);

  return (
    <section className={styles.statistics}>
      <div className={`${styles.statistics_container} container`}>
        <LineChart width={600} height={400} data={alcoChartData}>
          <Line type="monotone" dataKey="alcoData" stroke="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
    </section>
  );
}

export default StatisticsChart;

const mappedData = (data) => {
  return Object.entries(data).map(([date, alcoData]) => ({
    date: date,
    alcoData: alcoData,
  }));
};
