import styles from "./userparametersform.module.scss";
import UserParametersForm from "./UserParametersForm.jsx";

function UserParametersFormPage() {
  return (
    <section className={`${styles.user_param}`}>
      <UserParametersForm />
    </section>
  );
}

export default UserParametersFormPage;
