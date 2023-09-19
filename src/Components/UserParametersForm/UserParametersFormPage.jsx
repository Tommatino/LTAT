import styles from "./userparametersform.module.scss";
import UserParametersForm from "./UserParametersForm.jsx";

function UserParametersFormPage() {
  return (
    <section className={`${styles.userform}`}>
      <div className={styles.userform_wrapper}>
        <UserParametersForm />
      </div>
    </section>
  );
}

export default UserParametersFormPage;
