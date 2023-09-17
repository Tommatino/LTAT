import styles from "./footer.module.scss";

function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer_container} container`}>
        <a
          className={styles.footer_container__link}
          href={"//www.linkedin.com/in/tomasz-owczarski-2099"}
          // https://stackoverflow.com/questions/47447441/cant-open-new-tab-in-react-adds-localhost3000-on-link
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa fa-linkedin-square"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
