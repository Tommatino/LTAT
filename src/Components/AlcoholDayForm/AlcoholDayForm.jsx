import { useState } from "react";
import styles from "./alcoholdayform.module.scss";
import useAlcoholData from "../../Hooks/useAlcoholData.js";

function AlcoholDayForm() {
  const { setAlcoholDay, getAlcoholDay } = useAlcoholData();
  const [alcoholFormValues, setAlcoholFormValues] = useState({
    alcoholML: 0,
    alcoholPercentage: 0,
  });
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

  // const calculateGrams = () => {
  //   const alcoholPure = volumeML * (alcoholPercentage / 100);
  //   const alcoholGrams = (10 * alcoholPure) / 12.5;
  //   setVolumeGrams(alcoholGrams);
  // };

  // const calculatePromile = () => {
  //   const promile = volumeGrams / (userParam.weight * {userParam.gender === "F" ? 0.6 : 0.7} );
  //   setPromileCalculated(promile)
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataList((prev) => [...prev, alcoholFormValues]);
    console.log(dataList);
  };

  return (
    <section className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Ilość spoż. alkoholu [ml]:{" "}
          <input
            type="number"
            name="alcoholML"
            value={alcoholFormValues.alcoholML}
            onChange={handleChange}
          />
        </label>
        <label>
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

      <button>
        <span className="material-symbols-outlined">add_box</span>Zapisz
      </button>
    </section>
  );
}

export default AlcoholDayForm;
