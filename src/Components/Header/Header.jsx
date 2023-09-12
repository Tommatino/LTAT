import styles from "./header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";
import useUserData from "../../Hooks/useUserData.js";

function Header() {
  const user = useUserData();
  console.log(user);

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header_container} container`}>
        <a href={"/"} className={styles.logo}>
          LTAT
        </a>
        <nav className={styles.menu}>
          <ul className={styles.menu_nav}>
            <li className={styles.li}>
              <NavLink
                to={"/"}
                style={({ isActive }) => (isActive ? { color: "green" } : {})}
                end
              >
                Strona główna
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to={"/about"}
                style={({ isActive }) => (isActive ? { color: "green" } : {})}
                end
              >
                O aplikacji
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to={"/statistics"}
                className={styles.NavLink}
                style={({ isActive }) => (isActive ? { color: "green" } : {})}
                end
              >
                <span className={`${styles.span} material-symbols-outlined`}>
                  account_circle
                </span>
                {user && user?.email ? user.email : "Not logged in"}
                {/*alternatywnie span z user można zapisać: user.email || "not logged in"*/}
                {/*    znak zapytania używamy by uniknąć wyświetlania błędu w sytuacji gdy nie ma takiego obiektu*/}
                {user && <Logout />}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
