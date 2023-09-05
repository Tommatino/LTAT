import styles from "./footer.module.scss"

function Footer(props) {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footer_container} container`}>
                <div className={styles.footer_container__link}>LINK</div>
            </div>
        </footer>
    );
}

export default Footer;