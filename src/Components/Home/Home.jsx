import styles from "./home.module.scss";
import Row from "../Row/Row";
import useUserData from "../../Hooks/useUserData.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db, app } from "../../firebase.js";
import { getAuth } from "firebase/auth";
import useUserParameters from "../../Hooks/useUserParameters.js";
import AlcoholDayForm from "../AlcoholDayForm/AlcoholDayForm.jsx";
import useAlcoholData from "../../Hooks/useAlcoholData.js";

function Home() {
  const { getUserParam } = useUserParameters();
  const { getAlcoholData } = useAlcoholData();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const user = useUserData();
  const [userParam, setUserParam] = useState({});
  const [alcoholData, setAlcoholData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const [fetchedUserParam, fetchedAlcoholData] = await Promise.all([
          //promise all, przyjmuje kilka promisów i po ich realizacji zwraca jeden (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
          getUserParam(),
          getAlcoholData(),
        ]);
        setUserParam(fetchedUserParam);
        setAlcoholData(fetchedAlcoholData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <section className={styles.main}>
      <div className={`${styles.main_container} container`}>
        <article className={styles.main_article}>
          <div className={styles.main_article__first}>
            {/*<AlcoholDayForm />*/}
            <div className={styles.div}>
              <p>Ilość spoż. alkoholu w ostatnim tygodniu [g]:</p>
              <p>100</p>
              <p>Ilość spoż. alkoholu w ostatnich 4 tygodniach [g]:</p>
              <p>550</p>
            </div>
          </div>
          <div className={styles.main_article__second}>
            <table className={styles.table}>
              <thead>
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
              </thead>
              <tbody>
                {Object.keys(alcoholData).map((date, index) => (
                  <Row
                    key={date}
                    date={date}
                    alcoholGrams={alcoholData[date]}
                    lp={index}
                    gender={userParam.gender}
                    weight={userParam.weight}
                  />
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
