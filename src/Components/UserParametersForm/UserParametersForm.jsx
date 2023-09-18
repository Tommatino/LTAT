import styles from "./userparametersform.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app, db } from "../../firebase.js";
import { useEffect, useState } from "react";
import { addDoc, setDoc, doc, collection } from "firebase/firestore";
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

  useEffect(() => {
    const fetchUserParam = async () => {
      try {
        const userParam = await getUserParam();
        setUserParameters(userParam);
        setPrevWeight(userParam.weight);
        console.log("Form user param", userParam);
      } catch (err) {
        console.log(err);
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
    setCheckWeight(userParameters.weight > 0 ? false : true);
    if (!checkWeight) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validate()) {
        const userParametersRef = collection(db, "userParameters");
        await setDoc(doc(userParametersRef, auth.currentUser.uid), {
          gender: userParameters.gender,
          weight: parseInt(userParameters.weight),
          user: user.uid,
        });
        setPrevWeight(userParameters.weight);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setUserParameters((prev) => {
      return {
        ...prev,
        weight: 0,
      };
    });
  };

  return (
    <section className={`${styles.userform}`}>
      <div className={styles.userform_wrapper}>
        <form className={`${styles.userform_form}`} onSubmit={handleSubmit}>
          <h3 className={`${styles.p}`}>Podaj dodatkowe, niezbędne dane:</h3>

          <label className={styles.label}>
            Płeć:
            <input
              type="radio"
              name="gender"
              value="F"
              checked={userParameters.gender === "F"}
              onChange={handleChange}
            />
            K
            <input
              type="radio"
              name="gender"
              value="M"
              checked={userParameters.gender === "M"}
              onChange={handleChange}
            />
            M
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
          <p>Poprzednia waga: {prevWeight || 0}</p>
          <button type="submit" className={styles.button}>
            Prześlij
          </button>
          {checkWeight && <p>Musisz podać wagę</p>}
        </form>
      </div>
    </section>
  );
}

export default UserParametersForm;
