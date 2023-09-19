import styles from "./header.module.scss";
import { NavLink } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";
import useUserLogin from "../../Hooks/useUserLogin.js";

function Header() {
  const user = useUserLogin();

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
                to={"/"}
                style={({ isActive }) =>
                  isActive && user
                    ? {
                        color: "#0BDA51",
                        fontSize: "1.15rem",
                      }
                    : {}
                }
                end
              >
                Main
              </NavLink>
            </li>

            <li className={styles.li}>
              <NavLink
                to={"/alcohol-form"}
                style={({ isActive }) =>
                  isActive && user
                    ? { color: "#0BDA51", fontSize: "1.15rem" }
                    : {}
                }
                end
              >
                %-form
              </NavLink>
            </li>

            <li className={styles.li}>
              <NavLink
                to={"/userform"}
                style={({ isActive }) =>
                  isActive && user
                    ? { color: "#0BDA51", fontSize: "1.15rem" }
                    : {}
                }
                end
              >
                User
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to={"/about"}
                style={({ isActive }) =>
                  isActive && user
                    ? { color: "#0BDA51", fontSize: "1.15rem" }
                    : {}
                }
                end
              >
                About
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to={"/statistics-chart"}
                className={styles.NavLink}
                style={({ isActive }) =>
                  isActive && user
                    ? { color: "#0BDA51", fontSize: "1.15rem" }
                    : {}
                }
                end
              >
                {/*<span className={`${styles.span} material-symbols-outlined`}>*/}
                {/*  account_circle*/}
                {/*</span>*/}
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
