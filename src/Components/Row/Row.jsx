import styles from "./row.module.scss";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import useAlcoholData from "../../Hooks/useAlcoholData.js";

function Row({ date, alcoholGrams, lp, gender, weight, deleteRow }) {
  const { delAlcoholDay } = useAlcoholData();
  let promileSwitch;
  let switchText;
  const relation = () => {
    if (gender === "F") {
      return alcoholGrams > 20
        ? "Przekroczono dzienny limit dla kobiety"
        : "Nie przekroczono dziennego limitu dla kobiety";
    }
    return alcoholGrams > 40
      ? "Przekroczono dzienny limit dla mężczyzny"
      : "Nie przekroczono dziennego limitu dla mężczyzny";
  };

  const calculatePromile = () => {
    const factor = gender === "F" ? 0.6 : 0.7;
    const promile = ((alcoholGrams / weight) * factor).toFixed(2);
    promileSwitch = promile * 1;
    console.log("check", promileSwitch);
    return promile;
  };

  calculatePromile();

  if (promileSwitch >= 0.3 && promileSwitch <= 0.5) {
    switchText =
      "Nieznaczne zaburzenia równowagi oraz euforia, zaburzenia widzenia";
  } else if (promileSwitch > 0.5 && promileSwitch <= 0.7) {
    switchText = "Zaburzenia sprawności ruchowej, obniżenie samokontroli";
  } else if (promileSwitch > 0.7 && promileSwitch <= 2) {
    switchText =
      "Zaburzenia równowagi, sprawności i koordynacji ruchowej, obniżenie progu bólu, spadek sprawności intelektualnej";
  } else if (promileSwitch > 2 && promileSwitch <= 3) {
    switchText =
      "Zaburzenia mowy (mowa bełkotliwa), wyraźne spowolnienie i zaburzenia równowagi, wzmożona senność, znaczne obniżona zdolność do kontroli własnych zachowań";
  } else if (promileSwitch > 3 && promileSwitch <= 4) {
    switchText =
      "Spadek ciśnienia krwi, obniżenie ciepłoty ciała, osłabienie lub zanik odruchów fizjologicznych oraz głębokie zaburzenia świadomości, poważne zagrożenie zdrowia człowieka";
  } else if (promileSwitch > 4) {
    switchText =
      "Głęboka śpiączka, zaburzenia czynności ośrodka oddechowego i naczyniowo-ruchowego, możliwość porażenia tych ośrodków przez alkohol, stan zagrożenia życia";
  } else {
    switchText = "Bez efektu";
  }

  console.log("Switch tekst:", switchText);

  const handleClick = async () => {
    await delAlcoholDay(date);
    deleteRow(date);
  };

  return (
    <tr style={styles.tr}>
      <td>{lp + 1}</td>
      <td>{date}</td>
      <td>{alcoholGrams}</td>
      <td>{relation()}</td>
      <td>{(alcoholGrams / 10).toFixed(1)}</td>
      <td>{promileSwitch}</td>
      <td>{switchText}</td>
      <td>
        <span className="material-symbols-outlined" onClick={handleClick}>
          disabled_by_default
        </span>
      </td>
    </tr>
  );
}

export default Row;
