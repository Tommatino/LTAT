import { useState } from "react";
import styles from "./alcoholdayform.module.scss";

function AlcoholDayForm() {
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
  const [promileCalculated, setPromileCalculated] = useState(0);

  const calculateGrams = () => {
    const alcoholPure = volumeML * (alcoholPercentage / 100);
    const alcoholGrams = (10 * alcoholPure) / 12.5;
    setVolumeGrams(alcoholGrams);
  };

  // const calculatePromile = () => {
  //   const promile = volumeGrams / (userParam.weight * {userParam.gender === "F" ? 0.6 : 0.7} );
  //   setPromileCalculated(promile)
  // };

  return (
    <section className={styles.form_container}>
      <form className={styles.form}>
        <button>
          <span className="material-symbols-outlined">add_box</span>Dodaj dzień
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
    </section>
  );
}

export default AlcoholDayForm;
