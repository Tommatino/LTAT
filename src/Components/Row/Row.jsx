import useAlcoholData from "../../Hooks/useAlcoholData.js";
import { useEffect, useState } from "react";

function Row({ date, alcoholGrams, lp, gender, weight, deleteRow }) {
  const { delAlcoholDay } = useAlcoholData();
  const [promileSwitch, setPromileSwitch] = useState(0);
  const [switchText, setSwitchText] = useState(null);

  useEffect(() => {
    const factor = gender === "F" ? 0.6 : 0.7;
    const promile = (alcoholGrams / (weight * factor)).toFixed(2);
    setPromileSwitch(promile * 1);
  }, [alcoholGrams, gender, weight]);

  useEffect(() => {
    switchFunction();
  }, []);

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

  const switchFunction = () => {
    if (promileSwitch >= 0.3 && promileSwitch <= 0.5) {
      setSwitchText(
        "Nieznaczne zaburzenia równowagi oraz euforia, zaburzenia widzenia",
      );
    } else if (promileSwitch > 0.5 && promileSwitch <= 0.7) {
      setSwitchText("Zaburzenia sprawności ruchowej, obniżenie samokontroli");
    } else if (promileSwitch > 0.7 && promileSwitch <= 2) {
      setSwitchText(
        "Zaburzenia równowagi, sprawności i koordynacji ruchowej, obniżenie progu bólu, spadek sprawności intelektualnej",
      );
    } else if (promileSwitch > 2 && promileSwitch <= 3) {
      setSwitchText(
        "Zaburzenia mowy (mowa bełkotliwa), wyraźne spowolnienie i zaburzenia równowagi, wzmożona senność, znaczne obniżona zdolność do kontroli własnych zachowań",
      );
    } else if (promileSwitch > 3 && promileSwitch <= 4) {
      setSwitchText(
        "Spadek ciśnienia krwi, obniżenie ciepłoty ciała, osłabienie lub zanik odruchów fizjologicznych oraz głębokie zaburzenia świadomości, poważne zagrożenie zdrowia człowieka",
      );
    } else if (promileSwitch > 4) {
      setSwitchText(
        "Głęboka śpiączka, zaburzenia czynności ośrodka oddechowego i naczyniowo-ruchowego, możliwość porażenia tych ośrodków przez alkohol, stan zagrożenia życia",
      );
    } else {
      setSwitchText("Bez efektu");
    }
  };

  const handleClick = async () => {
    await delAlcoholDay(date);
    deleteRow(date);
  };

  return (
    <tr>
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
