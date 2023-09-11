import styles from './login.module.scss'
import {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase.js'
import {useNavigate} from "react-router-dom";

function Signup() {
    const auth = getAuth(app);
    const navigate = useNavigate()
    const [user, setUser] = useState(
        {
            email: "",
            password: "",
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        //console.log(user)
    }

    const handleClick = () => {
        navigate("/signup")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`Error code: ${errorCode}`)
                console.log(`Error code: ${errorMessage}`)
            });
    }

    return (
        <section className={`${styles.login}`}>
            <div className={styles.login_container}>
                <form className={`${styles.login_form}`} onSubmit={handleSubmit}>
                    <h3 className={`${styles.p}`}>Login:</h3>
                    <label className={styles.label}>
                        E-mail: <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="E-mail"/>
                    </label>
                    <label className={styles.label}>
                        Hasło: <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Hasło"/>
                    </label>
                    <button type="submit" className={styles.button}>Prześlij</button>
                </form>
                <div className={styles.login_signup}>
                    <h4 className={`${styles.p}`}>Nowy użytkownik:</h4>
                    <button onClick={handleClick}>Kliknij tu</button>
                </div>
            </div>
        </section>
    );
}

export default Signup;