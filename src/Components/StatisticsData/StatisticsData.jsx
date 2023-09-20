import styles from "./statisticsdata.module.scss";
import useCalcAlcoholStats from "../../Hooks/useCalcAlcoholStats.js";

function StatisticsData({ historicalData }) {
  const { calcLastWeek, calcLastFourWeeks, calcLastAllDays } =
    useCalcAlcoholStats();

  return (
    <div className={styles.statistics_data}>
      <p>
        Ilość alko. spoż. w ost. tyg. [g]:
        <span>{calcLastWeek(historicalData)}</span>
      </p>
      <p>
        Ilość alko. spoż. w ost. 4 tyg. [g]:
        <span>{calcLastFourWeeks(historicalData)}</span>
      </p>
      <p>
        Ilość alko. spoż. łącznie [g]:
        <span>{calcLastAllDays(historicalData)}</span>
      </p>
    </div>
  );
}

export default StatisticsData;
