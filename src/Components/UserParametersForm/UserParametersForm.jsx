import styles from "./userparametersform.module.scss";
import { getAuth } from "firebase/auth";
import { app, db } from "../../firebase.js";
import { useEffect, useState } from "react";
import { setDoc, doc, collection } from "firebase/firestore";
import useUserLogin from "../../Hooks/useUserLogin.js";
import useUserParameters from "../../Hooks/useUserParameters.js";

function UserParametersForm() {
  const auth = getAuth(app);
  const user = useUserLogin();
  const { getUserParam } = useUserParameters();
  const [userParameters, setUserParameters] = useState({
    gender: "F",
    weight: 0,
  });
  const [prevWeight, setPrevWeight] = useState(null);
  const [checkWeight, setCheckWeight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    const fetchUserParam = async () => {
      try {
        setIsLoading(true);
        const userParam = await getUserParam();
        userParam && setUserParameters(userParam);
        setPrevWeight(userParam?.weight || 0);
        setIsLoading(false);
      } catch (err) {
        setIsFailed(err.message);
        setIsLoading(false);
      }
    };
    fetchUserParam();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserParameters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const validate = () => {
    setCheckWeight(userParameters.weight <= 0);
    if (!checkWeight) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validate()) {
        setIsLoading(true);
        const userParametersRef = collection(db, "userParameters");
        await setDoc(doc(userParametersRef, auth.currentUser.uid), {
          gender: userParameters.gender,
          weight: parseInt(userParameters.weight),
          user: user.uid,
        });
        setPrevWeight(userParameters.weight);
        setIsLoading(false);
        setUserParameters((prev) => {
          return {
            ...prev,
            weight: 0,
          };
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false);
      setIsFailed(true);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isFailed) {
    return <p>{isFailed}</p>;
  }

  return (
    <div className={styles.user_param__wrapper}>
      <form className={`${styles.user_param__form}`} onSubmit={handleSubmit}>
        <h3 className={`${styles.h3}`}>Podaj dodatkowe, niezbędne dane:</h3>

        <label className={styles.label}>
          Płeć:
          <input
            type="radio"
            name="gender"
            value="F"
            checked={userParameters.gender === "F"}
            onChange={handleChange}
          />
          <span>K</span>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={userParameters.gender === "M"}
            onChange={handleChange}
          />
          <span>M</span>
        </label>
        <label className={styles.label}>
          Waga:{" "}
          <input
            type="number"
            name="weight"
            value={userParameters.weight}
            onChange={handleChange}
            placeholder="kg"
          />
        </label>
        <p>
          Poprzednia waga: <span>{prevWeight || 0}</span>
        </p>
        <button type="submit" className={`${styles.button} btn`}>
          Prześlij
        </button>
        {checkWeight && <p>Musisz podać wagę</p>}
      </form>
    </div>
  );
}

export default UserParametersForm;
