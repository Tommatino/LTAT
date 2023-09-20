import styles from "./alcoholdayform.module.scss";
import AlcoholDayForm from "./AlcoholDayForm.jsx";

function AlcoholDayFormPage() {
  return (
    <section className={styles.alcohol_day}>
      <div className={`${styles.alcohol_day__container} container`}>
        <AlcoholDayForm />
      </div>
    </section>
  );
}

export default AlcoholDayFormPage;
