import styles from "./statisticschart.module.scss";
import StatisticsChart from "./StatisticsChart";

function StatisticsChartsPage() {
  return (
    <section className={styles.statistics}>
      <div className={`${styles.statistics_container} container`}>
        <StatisticsChart />
      </div>
    </section>
  );
}

export default StatisticsChartsPage;
