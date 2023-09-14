import { useState } from "react";
import styles from "./alcoholdayform.module.scss";
import useAlcoholData from "../../Hooks/useAlcoholData.js";
import { collection, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

function AlcoholDayForm() {
  const { setAlcoholDay, getAlcoholDay } = useAlcoholData();
  const [alcoholFormValues, setAlcoholFormValues] = useState({
    alcoholML: 0,
    alcoholPercentage: 0,
  });
  const [alcoholGrams, setAlcoholGrams] = useState(0);
  const [promile, setPromile] = useState(0);
  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlcoholFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const getUserParameters = async () => {
    const userParametersRef = collection(db, "userParameters");
    const docSnap = await getDoc(userParametersRef);
    return docSnap.data();
  };
  const calculateGrams = () => {
    const alcoholPureCalc =
      alcoholFormValues.alcoholML * (alcoholFormValues.alcoholPercentage / 100);
    const alcoholGramsCalc = (10 * alcoholPureCalc) / 12.5;
    setAlcoholGrams((prev) => prev + alcoholGramsCalc);
  };

  const calculatePromile = () => {
    const { gender, weight } = getUserParameters();
    const factor = gender === "F" ? 0.6 : 0.7;
    const promile = alcoholGrams / (weight * factor);
    setPromile((prev) => prev + promile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataList((prev) => [...prev, alcoholFormValues]);
    console.log(dataList);
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

        <button className={styles.button_save}>
          <span className="material-symbols-outlined">add_box</span>Zapisz
        </button>
      </div>
    </section>
  );
}

export default AlcoholDayForm;
