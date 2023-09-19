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

  return (
    <LineChart width={600} height={400} data={alcoChartData}>
      <Line type="monotone" dataKey="alcoData" stroke="#8884d8" />
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#f5f5f5" />
      <Tooltip />
      <Legend />
    </LineChart>
  );
}

export default StatisticsChart;

const mappedData = (data) => {
  return Object.entries(data).map(([date, alcoData]) => ({
    date: date,
    alcoData: alcoData,
  }));
};
