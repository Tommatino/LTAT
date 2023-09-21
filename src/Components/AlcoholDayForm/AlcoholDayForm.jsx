import { useEffect, useState } from "react";
import styles from "./alcoholdayform.module.scss";
import useAlcoholData from "../../Hooks/useAlcoholData.js";
import StatisticsData from "../StatisticsData/StatisticsData.jsx";
import useUserLogin from "../../Hooks/useUserLogin.js";
function AlcoholDayForm() {
  const user = useUserLogin();
  const { setAlcoholDay, getAlcoholDay, getAlcoholData } = useAlcoholData();
  const [alcoholFormValues, setAlcoholFormValues] = useState({
    alcoholML: 0,
    alcoholPercentage: 0,
  });
  const [alcoholGrams, setAlcoholGrams] = useState(0);
  const [historicalData, setHistoricalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(null);

  useEffect(() => {
    const getHistoricalAlcoholData = async () => {
      try {
        setIsLoading(true);
        const data = await getAlcoholData();
        setHistoricalData(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsFailed(err.message);
      }
    };
    getHistoricalAlcoholData();
  }, []);

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
      setIsLoading(true);
      const consumedAlcohol = await getAlcoholDay();
      setAlcoholDay(alcoholGrams, consumedAlcohol, user.uid);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsFailed(true);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isFailed) {
    return <p>{isFailed}.</p>;
  }

  return (
    <div className={styles.alcohol_day__wrapper}>
      <div className={styles.alcohol_day__info}>
        <h3 className={styles.h3}>Aktualne wartości:</h3>
        <p className={styles.p}>
          Czysty alkohol łącznie [g]: <span>{alcoholGrams}</span>
        </p>
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
        <button type="submit" className={`btn`}>
          Dodaj pozycję
        </button>
      </form>

      <button className={`${styles.button_save} btn`} onClick={handleClick}>
        Zapisz
      </button>

      <StatisticsData historicalData={historicalData} />
    </div>
  );
}

export default AlcoholDayForm;
