import styles from "./statisticschart.module.scss";
import alcoDataSorting from "../../Utils/alcoDataSorting.js";
import { Link } from "react-router-dom";
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
  ResponsiveContainer,
} from "recharts";
//https://recharts.org/en-US
//https://github.com/recharts/recharts/issues/466
function StatisticsChart() {
  const { getAlcoholData } = useAlcoholData();
  const [alcoChartData, setAlcoChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    const getAlcoDays = async () => {
      setIsLoading(true);
      try {
        const data = await getAlcoholData();

        setAlcoChartData(mappedData(data));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsFailed(true);
        setIsLoading(false);
      }
    };
    getAlcoDays();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isFailed) {
    return <p>Something gone wrong...</p>;
  }

  if (!alcoChartData.length) {
    return (
      <p>
        Musisz podać dane w %-form{" "}
        <Link to={"/alcohol-form"} className={`btn`}>
          Go to
        </Link>
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={alcoChartData}>
        <Line type="monotone" dataKey="alcoData" stroke="#0BDA51" />
        <XAxis dataKey="date" angle={-45} textAnchor="end" height={100} />
        <YAxis />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StatisticsChart;

const mappedData = (data) => {
  return alcoDataSorting(data).map(([date, alcoData]) => ({
    date: date,
    alcoData: alcoData,
  }));
};
