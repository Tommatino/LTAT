import styles from "./signup.module.scss";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase.js";
import { db } from "../../firebase.js";
import { NavLink, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

function Signup() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validate = () => {
        setCheckEmail(
          user.email.length < 3 &&
            user.email.includes("@") &&
            user.email.includes("."),
        );
        setCheckPassword(user.password.length < 5);
        if (checkEmail || checkPassword) {
          return false;
        } else {
          return true;
        }
      };

      if (validate()) {
        const { email, password } = user;
        await createUserWithEmailAndPassword(auth, email, password);

        navigate("/userform");
      }
    } catch (error) {
      setError(error?.message || "Coś poszło nie tak");
    }
  };

  return (
    <section className={`${styles.signup}`}>
      <div className={styles.signup_wrapper}>
        <form className={`${styles.signup_form}`} onSubmit={handleSubmit}>
          <h3 className={`${styles.h3}`}>Pierwsze logowanie na stronie:</h3>
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
          <button type="submit" className={`${styles.button} btn`}>
            Prześlij
          </button>
          {error && <p>{error}</p>}
          {checkEmail && (
            <p>
              Email musi się składać z przynajmniej 3 znaków, oraz zawierać odp
              znaki
            </p>
          )}
          {checkPassword && (
            <p>Hasło musi się składać z przynajmniej 5 znaków</p>
          )}
        </form>
        <NavLink to={"/login"} className={`${styles.NavLink} btn`} end>
          Do logowania
        </NavLink>
      </div>
    </section>
  );
}

export default Signup;
