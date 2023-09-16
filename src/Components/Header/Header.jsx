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
        <a href={user ? "/" : "/signup"} className={styles.logo}>
          LTAT
        </a>
        <nav className={styles.menu}>
          <ul className={styles.menu_nav}>
            <li className={styles.li}>
              <NavLink
                to={user ? "/" : "/signup"}
                style={({ isActive }) =>
                  isActive && user ? { color: "green" } : {}
                }
                end
              >
                Strona główna
              </NavLink>
            </li>

            <li className={styles.li}>
              <NavLink
                to={user ? "/alcohol-form" : "/signup"}
                style={({ isActive }) =>
                  isActive && user ? { color: "green" } : {}
                }
                end
              >
                % Formularz
              </NavLink>
            </li>

            <li className={styles.li}>
              <NavLink
                to={user ? "/userform" : "/signup"}
                style={({ isActive }) =>
                  isActive && user ? { color: "green" } : {}
                }
                end
              >
                Dane użytkownika
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to={user ? "/about" : "/signup"}
                style={({ isActive }) =>
                  isActive && user ? { color: "green" } : {}
                }
                end
              >
                O aplikacji
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to={user ? "/statistics" : "/signup"}
                className={styles.NavLink}
                style={({ isActive }) =>
                  isActive && user ? { color: "green" } : {}
                }
                end
              >
                <span className={`${styles.span} material-symbols-outlined`}>
                  account_circle
                </span>
                {user?.email || "Not logged in"}
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
