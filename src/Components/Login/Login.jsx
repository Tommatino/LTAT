import styles from './login.module.scss'
import {useState} from "react";

function Signup(props) {
    const [user, setUser] = useState(
        {
            email: "",
            password: "",
        }
    )
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        console.log(user)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validate = () => {
            // setCheckEmail();
            // setCheckPassword();

            if (checkEmail || checkPassword) {
                return false
            } else {
                return true
            }
        }

        if (validate()){
            console.log('Udało się')
        }
    }


    return (
        <section className={`${styles.login}`}>
            <form className={`${styles.login_form}`} onSubmit={handleSubmit}>
                <h3 className={`${styles.p}`}>Login:</h3>
                <label className={styles.label}>
                    E-mail: <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="E-mail"/>
                </label>
                <label className={styles.label}>
                    Hasło: <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Hasło"/>
                </label>
                <button type="submit" className={styles.button}>Prześlij</button>

                {checkEmail && <p>Niezgodny e-mail</p>}
                {checkPassword && <p>Niezgodne hasło</p>}

            </form>
        </section>
    );
}

export default Signup;