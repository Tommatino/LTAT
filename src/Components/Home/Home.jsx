import styles from "./home.module.scss";
import Row from "../Row/Row";
import useUserData from "../../Hooks/useUserData.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const user = useUserData();
  const [days, setDays] = useState([1, 2, 3]);
  const [currentDay, setCurrentDay] = useState({
    lp: "",
    data: "",
    volume: 0,
    relation: "",
    burning: "",
    promil: 0,
    influence: "",
  });
  const [volumeML, setVolumeML] = useState(0);
  const [volumeGrams, setVolumeGrams] = useState(0);
  const [alcoholPercentage, setAlcoholPercentage] = useState(0);

  const calculateGrams = () => {
    const alcoholPure = volumeML * (alcoholPercentage / 100);
    const alcoholGrams = (10 * alcoholPure) / 12.5;
    setVolumeGrams(alcoholGrams);
  };

  // const promilCalc = () => {
  //     return (volumeGrams / (user.weight * {user.gender === "k" ? 0.6 : 0.7}));
  // }

  // useEffect(() => {
  //   if (!user) {
  //     console.log(user, 1);
  //     navigate("/signup");
  //     console.log(user, 2);
  //   }
  // }, [navigate, user]);

  return (
    <section className={styles.main}>
      <div className={`${styles.main_container} container`}>
        <article className={styles.main_article}>
          <div className={styles.main_article__first}>
            <form className={styles.form}>
              <button>
                <span className="material-symbols-outlined">add_box</span>Dodaj
                dzień
              </button>
              <label>
                Ilość spoż. alkoholu [ml]:{" "}
                <input
                  type="number"
                  value={volumeML}
                  onChange={(e) => setVolumeML(e.target.value)}
                />
              </label>
              <label>
                Zawartość alkoholu [%]:{" "}
                <input
                  type="number"
                  value={alcoholPercentage}
                  onChange={(e) => setAlcoholPercentage(e.target.value)}
                />
              </label>
              <button>
                Dodaj pozycję i zsumuj{" "}
                <span className="material-symbols-outlined">add_box</span>
              </button>
            </form>
            <div className={styles.div}>
              <p>Ilość spoż. alkoholu w ostatnim tygodniu [g]:</p>
              <p>100</p>
              <p>Ilość spoż. alkoholu w ostatnich 4 tygodniach [g]:</p>
              <p>550</p>
            </div>
          </div>
          <div className={styles.main_article__second}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th className={styles.td}>lp.</th>
                  <th className={styles.td}>Data</th>
                  <th className={styles.td}>Ilość spoż. alkoholu [g]</th>
                  <th className={styles.td}>
                    Relacja względem dziennego limitu [g]
                  </th>
                  <th className={styles.td}>Spalanie [h]</th>
                  <th className={styles.td}>Promile [‰]</th>
                  <th className={styles.td}>Promile, wpływ na zdrowie</th>
                  <th className={styles.td}>Usuń</th>
                </tr>
                {days.map((day, index) => (
                  <Row key={index} lp={index + 1} />
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Home;
