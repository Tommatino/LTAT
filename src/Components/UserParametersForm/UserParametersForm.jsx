import styles from "./userparametersform.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app, db } from "../../firebase.js";
import { useEffect, useState } from "react";
import { addDoc, setDoc, doc, collection } from "firebase/firestore";
import useUserData from "../../Hooks/useUserData.js";
import useUserParameters from "../../Hooks/useUserParameters.js";

function UserParametersForm() {
  const auth = getAuth(app);
  const u = useUserData();
  const { getUserParam } = useUserParameters();
  const [user, setUser] = useState({
    gender: "F",
    weight: 0,
  });
  const [uParam, setUParam] = useState({});
  const [checkWeight, setCheckWeight] = useState(false);

  useEffect(() => {
    const fetchUserParam = async () => {
      try {
        const userParam = await getUserParam();
        setUParam(userParam);
        console.log("Form user param", uParam);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserParam();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log(user);
  };

  const validate = () => {
    console.log(
      typeof user.weight,
      user.weight,
      user.weight.length,
      typeof user.weight.length,
    );
    setCheckWeight(user.weight > 0 ? false : true);
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
          gender: user.gender,
          weight: parseInt(user.weight),
          user: u.uid,
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setUser((prev) => {
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
              checked={user.gender === "F"}
              onChange={handleChange}
            />
            K
            <input
              type="radio"
              name="gender"
              value="M"
              checked={user.gender === "M"}
              onChange={handleChange}
            />
            M
          </label>
          <label className={styles.label}>
            Waga:{" "}
            <input
              type="number"
              name="weight"
              value={user.weight}
              onChange={handleChange}
              placeholder="kg"
            />
          </label>
          <p>Bieżąca waga: {uParam.weight || 0}</p>
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
