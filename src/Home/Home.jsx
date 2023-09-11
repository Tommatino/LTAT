import styles from "./home.module.scss"
import {useState} from "react";
import Signup from "../Signup/Signup.jsx";
import Login from "../Login/Login.jsx";

function Home(props) {
const [user, setUser] = useState([1])
const [isloggedin, setIsloggedin] = useState(false)


    if(user.length) {
        return <Signup />
    }

    if(isloggedin) {
        return <Login />
    }


    return (
        <section className={styles.main}>
            <div className={`${styles.main_container} container`}>
                <article className={styles.main_article}>
                    <div className={styles.main_article__first}>
                        <form className={styles.form}>
                            <button type="submit"><span className="material-symbols-outlined">add_box</span>Dodaj dzień</button>
                            <label>
                                Ilość spoż. alkoholu [ml]: <input type="number"/>
                            </label>
                            <label>
                                Zawartość alkoholu [%]: <input type="number"/>
                            </label>
                            <button>Dodaj pozycję i zsumuj <span className="material-symbols-outlined">add_box</span></button>
                        </form>
                        <div className={styles.div}>
                            <p>Ilość spoż. alkoholu w ostatnim tygodniu [g]:</p>
                            <p>100</p>
                            <p>Ilość spoż. alkoholu w ostatnich 4 tygodniach [g]:</p>
                            <p>550</p>
                        </div>
                    </div>
                    <div className={styles.main_article__second}>
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <td className={styles.td}>
                                        lp.
                                    </td>
                                    <td className={styles.td}>
                                        Data
                                    </td>
                                    <td className={styles.td}>
                                        Ilość spoż. alkoholu [g]
                                    </td>
                                    <td className={styles.td}>
                                        Relacja względem dziennego limitu [g]
                                    </td>
                                    <td className={styles.td}>
                                        Spalanie [h]
                                    </td>
                                    <td className={styles.td}>
                                        Promile [‰]
                                    </td>
                                    <td className={styles.td}>
                                        Promile, wpływ na zdrowie
                                    </td>
                                    <td className={styles.td}>
                                        Usuń
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Home;