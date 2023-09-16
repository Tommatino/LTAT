import styles from "./statisticschart.module.scss";
import useUserData from "../../Hooks/useUserLogin.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function StatisticsChart(props) {
  const user = useUserData();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/signup");
  //   }
  // }, [user, navigate]);

  return (
    <section className={styles.statistics}>
      <div className={`${styles.statistics_container} container`}></div>
    </section>
  );
}

export default StatisticsChart;
