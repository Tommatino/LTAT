import styles from "./home.module.scss";
import Row from "../Row/Row";
import alcoDataSorting from "../../Utils/alcoDataSorting.js";
import { useState } from "react";
import { useEffect } from "react";
import useUserParameters from "../../Hooks/useUserParameters.js";
import useAlcoholData from "../../Hooks/useAlcoholData.js";
import { Link } from "react-router-dom";

function Home() {
  const { getUserParam } = useUserParameters();
  const { getAlcoholData } = useAlcoholData();
  const [userParam, setUserParam] = useState({});
  const [alcoholData, setAlcoholData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const [fetchedUserParam, fetchedAlcoholData] = await Promise.all([
          getUserParam(),
          getAlcoholData(),
        ]);
        setUserParam(fetchedUserParam);
        setAlcoholData(fetchedAlcoholData);
        setIsLoading(false);
      } catch (err) {
        setIsFailed(err?.message || "Something gone wrong");
        setIsLoading(false);
      }
    };
    getUserData();
  }, []);

  const deleteRow = (date) => {
    setAlcoholData((prev) => {
      // eslint-disable-next-line no-unused-vars
      const { [date]: dayToDelete, ...otherDays } = prev;
      return {
        ...otherDays,
      };
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isFailed) {
    return <p>{isFailed}</p>;
  }
  if (!userParam) {
    return (
      <p>
        Musisz podać płeć i wagę{" "}
        <Link to={"/userform"} className={`btn`}>
          Go to
        </Link>
      </p>
    );
  }
  if (!Object.keys(alcoholData).length) {
    return (
      <p>
        Musisz podać dane w %-form{" "}
        <Link to={"/alcohol-form"} className={`btn`}>
          Go to
        </Link>
      </p>
    );
  }

  return (
    <div className={styles.main_wrapper}>
      <table className={styles.main_table}>
        <thead>
          <tr>
            <th className={styles.td}>lp.</th>
            <th className={styles.td}>Data</th>
            <th className={styles.td}>Ilość spoż. alkoholu [g]</th>
            <th className={styles.td}>Relacja względem dziennego limitu [g]</th>
            <th className={styles.td}>Spalanie [h]</th>
            <th className={styles.td}>Promile [‰]</th>
            <th className={styles.td}>Promile, wpływ na zdrowie</th>
            <th className={styles.td}>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {alcoDataSorting(alcoholData).map(([date, value], index) => (
            <Row
              key={date}
              date={date}
              alcoholGrams={value}
              lp={index}
              gender={userParam.gender}
              weight={userParam.weight}
              deleteRow={deleteRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
