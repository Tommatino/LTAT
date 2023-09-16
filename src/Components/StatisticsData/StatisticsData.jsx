import styles from "./statisticsdata.module.scss";

function StatisticsData() {
  return (
    <div className={styles.statistics_data}>
      <p>Ilość spoż. alkoholu w ostatnim tygodniu [g]:</p>
      <p>Ilość spoż. alkoholu w ostatnich 4 tygodniach [g]:</p>
      <p>Łączna ilość spoż. alkoholu w ostatnim tygodniu [g]:</p>
    </div>
  );
}

export default StatisticsData;
