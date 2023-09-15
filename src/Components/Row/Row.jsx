import styles from "./row.module.scss";

function Row({ date, alcoholGrams, lp, gender, weight }) {
  const relation = () => {
    if (gender === "F") {
      return alcoholGrams > 20
        ? "Przekroczono dzienny limit dla kobiety"
        : "Nie przekroczono dziennego limit dla kobiety";
    }
    return alcoholGrams > 40
      ? "Przekroczono dzienny limit dla mężczyzny"
      : "Nie przekroczono dziennego limitu dla mężczyzny";
  };

  const calculatePromile = () => {
    const factor = gender === "F" ? 0.6 : 0.7;
    const promile = ((alcoholGrams / weight) * factor).toFixed(2);
    return promile;
  };

  return (
    <tr style={styles.tr}>
      <td style={styles.td}>{lp + 1}</td>
      <td style={styles.td}>{date}</td>
      <td style={styles.td}>{alcoholGrams}</td>
      <td style={styles.td}>{relation()}</td>
      <td style={styles.td}>{(alcoholGrams / 10).toFixed(1)}</td>
      <td style={styles.td}>{calculatePromile()}</td>
      <td style={styles.td}></td>
      <td style={styles.td}>
        <span className="material-symbols-outlined">disabled_by_default</span>
      </td>
    </tr>
  );
}

export default Row;
