import styles from "./row.module.scss";

function Row({ lp }) {
  return (
    <tr style={styles.tr}>
      <td style={styles.td}>{lp}</td>
      <td style={styles.td}>{new Date().toLocaleDateString()}</td>
      <td style={styles.td}></td>
      <td style={styles.td}></td>
      <td style={styles.td}></td>
      <td style={styles.td}></td>
      <td style={styles.td}></td>
      <td style={styles.td}>
        <span className="material-symbols-outlined">disabled_by_default</span>
      </td>
    </tr>
  );
}

export default Row;
