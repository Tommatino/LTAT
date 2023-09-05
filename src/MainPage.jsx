import styles from "./mainpage.module.scss"

function MainPage(props) {
    return (
        <section className={styles.main}>
            <div className={`${styles.main_container} container`}>
                <article className={styles.main_article}>

                </article>
            </div>
        </section>
    );
}

export default MainPage;