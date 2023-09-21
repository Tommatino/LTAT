import styles from "./login.module.scss";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase.js";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleClick = () => {
    navigate("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        setError(null);
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error?.message || "Coś poszło nie tak");
        setIsLoading(false);
      });
  };

  return (
    <section className={`${styles.login}`}>
      <div className={styles.login_wrapper}>
        <form className={`${styles.login_form}`} onSubmit={handleSubmit}>
          <h3 className={`${styles.h3}`}>Login:</h3>
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

          <button
            type="submit"
            className={`${styles.button} btn`}
            disabled={isLoading}
          >
            Prześlij
          </button>
          {error && <p>{error}</p>}
        </form>

        <NavLink to={"/signup"} className={`${styles.NavLink} btn`} end>
          Pierwszy raz? - signup
        </NavLink>
      </div>
    </section>
  );
}

export default Signup;
