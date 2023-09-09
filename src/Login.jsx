import styles from './login.module.scss'

function Login(props) {
    return (
        <section className={`${styles.login}`}>
            <form className={`${styles.login_form}`}>
                <p className={`${styles.p}`}>Podaj dane:</p>
                <label className={styles.label}>
                    Nick: <input type="text" placeholder="Nick"/>
                </label>
                <label className={styles.label}>
                    Hasło: <input type="text" placeholder="Hasło"/>
                </label>
                <label className={styles.label}>
                    Płeć:
                    <input type="radio" name="gender" value="Female"/>K
                    <input type="radio" name="gender" value="Male"/>M
                </label>
                <label className={styles.label}>
                    Waga: <input type="number"/>
                </label>
                <button type="submit" className={styles.button}>Prześlij</button>
            </form>
        </section>
    );
}

export default Login;