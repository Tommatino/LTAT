import styles from './login.module.scss'
import {useState} from "react";

function Login(props) {
    const [user, setUser] = useState(
        {
            nick: "",
            password: "",
            gender: "",
            weight: "",
            days: []
        }
    )
    const [checkNick, setCheckNick] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false)
    const [checkGender, setCheckGender] = useState(false)
    const [checkWeight, setCheckWeight] = useState(false)

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
            setCheckNick(user.nick.length < 3);
            setCheckPassword(user.password.length < 5);
            setCheckGender(user.gender.length === 0)
            setCheckWeight(user.weight.length === 0)
            if (checkNick || checkPassword || checkGender || checkWeight) {
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
                <h3 className={`${styles.p}`}>Podaj dane:</h3>
                <label className={styles.label}>
                    Nick: <input type="text" name="nick" value={user.nick} onChange={handleChange} placeholder="Nick"/>
                </label>
                <label className={styles.label}>
                    Hasło: <input type="text" name="password" value={user.password} onChange={handleChange} placeholder="Hasło"/>
                </label>
                <label className={styles.label}>
                    Płeć:
                    <input type="radio" name="gender" value="Female" onChange={handleChange}/>K
                    <input type="radio" name="gender" value="Male" onChange={handleChange}/>M
                </label>
                <label className={styles.label}>
                    Waga: <input type="number" name="weight" value={user.weight} onChange={handleChange} placeholder="kg"/>
                </label>
                <button type="submit" className={styles.button}>Prześlij</button>

                {checkNick && <p>Nick musi się składać z przynajmniej 3 znaków</p>}
                {checkPassword && <p>Hasło musi się składać z przynajmniej 5 znaków</p>}
                {checkGender && <p>Należy podać płeć</p>}
                {checkWeight && <p>Należy podać wagę</p>}
            </form>
        </section>
    );
}

export default Login;