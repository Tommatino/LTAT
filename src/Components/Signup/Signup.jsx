import styles from "./signup.module.scss";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase.js";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    gender: "",
    weight: "",
    days: [],
  });
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkGender, setCheckGender] = useState(false);
  const [checkWeight, setCheckWeight] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    //najpierw wchodzi do try, jak coś się nie powiedzie to wchodzi do catcha
    try {
      e.preventDefault();
      const validate = () => {
        setCheckEmail(
          user.email.length < 3 &&
            user.email.includes("@") &&
            user.email.includes("."),
        );
        setCheckPassword(user.password.length < 5);
        setCheckGender(user.gender.length === 0);
        setCheckWeight(user.weight.length === 0);
        if (checkEmail || checkPassword || checkGender || checkWeight) {
          return false;
        } else {
          return true;
        }
      };

      if (validate()) {
        console.log("Udało się");
      }

      const { email, password } = user;
      await createUserWithEmailAndPassword(auth, email, password);

      console.log("Sprawdz");
      navigate("/");
    } catch (error) {
      setError(error?.message || "Coś poszło nie tak");
    }
  };

  return (
    <section className={`${styles.signup}`}>
      <form className={`${styles.signup_form}`} onSubmit={handleSubmit}>
        <h3 className={`${styles.p}`}>Podaj dane:</h3>
        <label className={styles.label}>
          E-mail:{" "}
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
        </label>
        <label className={styles.label}>
          Hasło:{" "}
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Hasło"
          />
        </label>
        <label className={styles.label}>
          Płeć:
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
          />
          K
          <input
            type="radio"
            name="gender"
            value="Male"
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
        {error && <p>{error}</p>}
        {checkEmail && (
          <p>
            Email musi się składać z przynajmniej 3 znaków, oraz zawierać odp
            znaki
          </p>
        )}
        {checkPassword && <p>Hasło musi się składać z przynajmniej 5 znaków</p>}
        {checkGender && <p>Należy podać płeć</p>}
        {checkWeight && <p>Należy podać wagę</p>}
      </form>
      <NavLink to={"/login"} end>
        Do logowania
      </NavLink>
    </section>
  );
}

export default Signup;
