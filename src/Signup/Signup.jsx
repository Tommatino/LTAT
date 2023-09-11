import styles from './signup.module.scss'
import {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase.js'
import {useNavigate} from "react-router-dom";

function Signup(props) {
    const navigate = useNavigate()
    const [user, setUser] = useState(
        {
            email: "",
            password: "",
            gender: "",
            weight: "",
            days: []
        }
    )
    const [checkEmail, setCheckEmail] = useState(false);
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
            setCheckEmail(user.email.length < 3 && user.email.includes("@") && user.email.includes("."));
            setCheckPassword(user.password.length < 5);
            setCheckGender(user.gender.length === 0)
            setCheckWeight(user.weight.length === 0)
            if (checkEmail || checkPassword || checkGender || checkWeight) {
                return false
            } else {
                return true
            }
        }

        if (validate()){
            console.log('Udało się')
        }

        const auth = getAuth(app);
        const {email, password} = user
        createUserWithEmailAndPassword(auth, email, password)
            .then(()=>{
                console.log("Sprawdz")
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }


    return (
        <section className={`${styles.signup}`}>
            <form className={`${styles.signup_form}`} onSubmit={handleSubmit}>
                <h3 className={`${styles.p}`}>Podaj dane:</h3>
                <label className={styles.label}>
                    E-mail: <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="E-mail"/>
                </label>
                <label className={styles.label}>
                    Hasło: <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Hasło"/>
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

                {checkEmail && <p>Email musi się składać z przynajmniej 3 znaków, oraz zawierać odp znaki</p>}
                {checkPassword && <p>Hasło musi się składać z przynajmniej 5 znaków</p>}
                {checkGender && <p>Należy podać płeć</p>}
                {checkWeight && <p>Należy podać wagę</p>}
            </form>
        </section>
    );
}

export default Signup;