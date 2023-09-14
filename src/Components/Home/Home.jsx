import styles from "./home.module.scss";
import Row from "../Row/Row";
import useUserData from "../../Hooks/useUserData.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db, app } from "../../firebase.js";
import { getAuth } from "firebase/auth";
import AlcoholDayForm from "../AlcoholDayForm/AlcoholDayForm.jsx";

function Home() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const user = useUserData();

  const [userParam, setUserParam] = useState({});

  const getUser = async () => {
    //const querySnapshot = await getDocs(collection(db, "userParameters"));
    const docRef = doc(db, "userParameters", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    console.log("Snapshot test new", docSnap);
    return docSnap;
  };

  useEffect(() => {
    getUser()
      .then((docSnap) => {
        console.log("Data from getUser", docSnap.data());
        setUserParam(docSnap.data());
      })
      .catch((err) => {
        console.log("The error", err);
      });
  }, []);

  console.log(user, "Home again");

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
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Home;
