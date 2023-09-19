import styles from "./home.module.scss";
import Home from "./Home.jsx";

function HomePage() {
  return (
    <article className={styles.main}>
      <div className={`${styles.main_container} container`}>
        <Home />
      </div>
    </article>
  );
}

export default HomePage;
