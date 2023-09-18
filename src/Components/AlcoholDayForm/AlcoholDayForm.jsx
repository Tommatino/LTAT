import { useEffect, useState } from "react";
import styles from "./alcoholdayform.module.scss";
import useAlcoholData from "../../Hooks/useAlcoholData.js";
import { collection, doc, getDoc } from "firebase/firestore";
import { app, db } from "../../firebase.js";
import { getAuth } from "firebase/auth";
import StatisticsData from "../StatisticsData/StatisticsData.jsx";
import useUserLogin from "../../Hooks/useUserLogin.js";
function AlcoholDayForm() {
  const auth = getAuth(app);
  const user = useUserLogin();
  const { setAlcoholDay, getAlcoholDay } = useAlcoholData();
  const [alcoholFormValues, setAlcoholFormValues] = useState({
    alcoholML: 0,
    alcoholPercentage: 0,
  });
  const [alcoholGrams, setAlcoholGrams] = useState(0);
  // const [promileTotal, setPromileTotal] = useState(0);
  const [userParam, setUserParam] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlcoholFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const calculateGrams = () => {
    const alcoholPureMlCalc =
      alcoholFormValues.alcoholML * (alcoholFormValues.alcoholPercentage / 100);
    const alcoholGramsCalc = (10 * alcoholPureMlCalc) / 12.5;
    setAlcoholGrams((prev) => prev + alcoholGramsCalc);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateGrams();
    console.log(alcoholGrams);
    setAlcoholFormValues({
      alcoholML: 0,
      alcoholPercentage: 0,
    });
  };

  const handleClick = async () => {
    try {
      const consumedAlcohol = await getAlcoholDay();
      setAlcoholDay(alcoholGrams, consumedAlcohol, user.uid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.alcohol_day}>
      <div className={`${styles.alcohol_day__container} container`}>
        <div className={styles.alcohol_day__info}>
          <h3 className={styles.h3}>Aktualne wartości:</h3>
          <p className={styles.p}>Czysty alkohol łącznie [g]: {alcoholGrams}</p>
        </div>
        <form className={styles.alcohol_day__form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Ilość spoż. alkoholu [ml]:{" "}
            <input
              type="number"
              name="alcoholML"
              value={alcoholFormValues.alcoholML}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Zawartość alkoholu [%]:{" "}
            <input
              type="number"
              name="alcoholPercentage"
              value={alcoholFormValues.alcoholPercentage}
              onChange={handleChange}
            />
          </label>
          <button type="submit">
            Dodaj pozycję
            <span className="material-symbols-outlined">add_box</span>
          </button>
        </form>

        <button className={styles.button_save} onClick={handleClick}>
          <span className="material-symbols-outlined">add_box</span>Zapisz
        </button>

        <StatisticsData />
      </div>
    </section>
  );
}

export default AlcoholDayForm;
