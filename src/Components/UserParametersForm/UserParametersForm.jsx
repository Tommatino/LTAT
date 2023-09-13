import styles from "./userparametersform.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app, db } from "../../firebase.js";
import { useState } from "react";
import { addDoc, setDoc, doc, collection } from "firebase/firestore";

function UserParametersForm(props) {
  const auth = getAuth(app);
  const [user, setUser] = useState({
    gender: "F",
    weight: 0,
  });
  const [checkWeight, setCheckWeight] = useState(false);

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
    setCheckWeight(parseInt(user.weight, 10) > 0);
    if (checkWeight) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validate()) {
        const userParametersRef = collection(db, "userParameters");
        console.log("Test user form");
        await setDoc(doc(userParametersRef, auth.currentUser.uid), {
          gender: user.gender,
          weight: user.weight,
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
          <button type="submit" className={styles.button}>
            Prześlij
          </button>
          {checkWeight && <p>Musisz podać wagę</p>}
          {/*{checkWeight && <p>Należy podać wagę</p>}*/}
        </form>
      </div>
    </section>
  );
}

export default UserParametersForm;
