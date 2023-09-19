import styles from "./statisticschart.module.scss";
import useUserData from "../../Hooks/useUserLogin.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAlcoholData from "../../Hooks/useAlcoholData.js";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function StatisticsChart() {
  const { getAlcoholData } = useAlcoholData();
  const [alcoChartData, setAlcoChartData] = useState({});

  useEffect(() => {
    const getAlcoDays = async () => {
      try {
        const data = await getAlcoholData();
        // https://github.com/machadop1407/chartjs-react-tutorial/blob/main/src/App.js
        setAlcoChartData({
          labels: Object.entries(data).map(([date]) => date),
          datasets: [
            {
              label: "Alcohol Consumed",
              data: Object.entries(data).map(
                ([, alcoholGrams]) => alcoholGrams,
              ),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
        console.log(Object.entries(data).map(([date]) => date));
        console.log(
          Object.entries(data).map(([, alcoholGrams]) => alcoholGrams),
        );
      } catch (err) {
        console.log(err);
      }
    };
    getAlcoDays();
  }, []);

  return (
    <section className={styles.statistics}>
      <div className={`${styles.statistics_container} container`}>
        <Line data={alcoChartData} />
      </div>
    </section>
  );
}

export default StatisticsChart;
