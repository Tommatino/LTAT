import styles from "./home.module.scss";
import Row from "../Row/Row";

import { useState } from "react";
import { useEffect } from "react";
import useUserParameters from "../../Hooks/useUserParameters.js";
import useAlcoholData from "../../Hooks/useAlcoholData.js";

function Home() {
  const { getUserParam } = useUserParameters();
  const { getAlcoholData } = useAlcoholData();
  const [userParam, setUserParam] = useState({});
  const [alcoholData, setAlcoholData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const [fetchedUserParam, fetchedAlcoholData] = await Promise.all([
          // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
          getUserParam(),
          getAlcoholData(),
        ]);
        setUserParam(fetchedUserParam);
        setAlcoholData(fetchedAlcoholData);
        console.log("Fetched % data", alcoholData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsFailed(true);
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
    return <p>Something gone wrong...</p>;
  }

  return (
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
        {Object.keys(alcoholData).map((date, index) => (
          <Row
            key={date}
            date={date}
            alcoholGrams={alcoholData[date]}
            lp={index}
            gender={userParam.gender}
            weight={userParam.weight}
            deleteRow={deleteRow}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Home;
