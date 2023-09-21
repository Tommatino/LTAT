import styles from "./userparametersform.module.scss";
import UserParametersForm from "./UserParametersForm.jsx";

function UserParametersFormPage() {
  return (
    <section className={`${styles.user_param}`}>
      <div className={styles.user_param__wrapper}>
        <UserParametersForm />
      </div>
    </section>
  );
}

export default UserParametersFormPage;
