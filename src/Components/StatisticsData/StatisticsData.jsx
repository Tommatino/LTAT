import styles from "./statisticsdata.module.scss";
import useCalcAlcoholStats from "../../Hooks/useCalcAlcoholStats.js";

function StatisticsData({ historicalData }) {
  const { calcLastWeek, calcLastFourWeeks, calcLastAllDays } =
    useCalcAlcoholStats();

  return (
    <div className={styles.statistics_data}>
      <p>
        Ilość spoż. alkoholu w ostatnim tygodniu [g]:
        {calcLastWeek(historicalData)}
      </p>
      <p>
        Ilość spoż. alkoholu w ostatnich 4 tygodniach [g]:
        {calcLastFourWeeks(historicalData)}
      </p>
      <p>
        Łączna ilość spoż. alkoholu w ostatnim tygodniu [g]:
        {calcLastAllDays(historicalData)}
      </p>
    </div>
  );
}

export default StatisticsData;
