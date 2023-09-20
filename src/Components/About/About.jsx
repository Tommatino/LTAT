import styles from "./about.module.scss";

function About() {
  return (
    <section className={styles.about}>
      <div className={`${styles.about_container} container`}>
        <div className={styles.about_article}>
          <h3>LONG-TERM ALCOHOL TEST</h3>
          <p>
            Zadaniem aplikacji jest zbieranie informacji dotyczących spożycia
            alkoholu przez użytkownika w następujących po sobie dniach.{" "}
          </p>
          <p>
            Użytkownik w danym dniu podaje ile spożył napoju zawierającego
            alkohol [ml], oraz ile procent alkoholu [%] on zawierał (np.
            użytkownik wypił jedno piwo, wpisuje 500 ml i np. zawartość alkoholu
            5%), klika „dodaj pozycję”, w tym momencie aplikacja przelicza ile
            czystego alkoholu w gramach spożył użytkownik i podaje aktualną
            wartość. Jeżeli użytkownik spożyje tego samego dnia dodatkowy napój
            zawierający alkohol, podaje on dane w sposób podany powyżej, a
            wartości zostaną zsumowane. Po kliknięciu „zapisz” wartości zostaną
            dodane do bazy danych. Jeżeli użytkownik nie spożywał alkoholu
            danego dnia, powinien dodać w aplikacji dzień z zerową wartością
            spożycia.
          </p>
          <p>
            Dane zabrane z danego dnia są przeliczane na promile (zawartość
            alkoholu we krwi) w oparciu o wzór Erika Widmarka, który
            wykorzystuje następujące dane: ilość czystego alkoholu w gramach,
            oraz o personalne informacje (płeć, waga) podawane przez użytkownika
            po zalogowaniu. Dane personalne można aktualizować w późniejszym
            czasie, np. w przypadku zmiany wagi użytkownika. Na stronie „Main”
            generowane są statystyki danego dnia, np. na podstawie ogólnie
            ustalonych dziennych limitów spożycia (20 g czystego alkoholu/dzień
            dla kobiet, oraz 40 g czystego alkoholu/dzień dla mężczyzn ), oraz
            na podstawie promili (statystyki dotyczące samopoczucia i zdrowia).
            Dodatkowo po kliknięciu na nazwę użytkownika można sprawdzić ogólną
            statystykę w postaci wykresu.
          </p>
          <p>
            Aplikacja pokazuje wartości poglądowe, ponieważ nie uwzględnia
            takich czynników jak: czasowe odstępy spożycia alkoholu,
            indywidualne preferencje organizmu, aktywność fizyczna i
            nawodnienie.
          </p>
          <p>
            Pamiętaj, że regularne spożywanie alkoholu nie jest zdrowe,
            zalecanym jest robienie przynajmniej dwu dniowych przerw w tygodniu.
          </p>
          <p>
            Aplikacja zbudowana jest w REACT, wykorzystuje takie technologie
            jak: Firebase, SCSS.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
