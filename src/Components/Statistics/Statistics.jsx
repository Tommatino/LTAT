import styles from "./statistics.module.scss";
import useUserData from "../../Hooks/useUserData.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Statistics(props) {
  const user = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user, navigate]);

  return (
    <section className={styles.statistics}>
      <div className={`${styles.statistics_container} container`}></div>
    </section>
  );
}

export default Statistics;
