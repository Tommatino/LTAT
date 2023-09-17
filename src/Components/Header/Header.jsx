import styles from "./header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";
import useUserLogin from "../../Hooks/useUserLogin.js";

function Header() {
  const user = useUserLogin();
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
                to={user ? "/alcohol-form" : "/signup"}
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
                to={user ? "/userform" : "/signup"}
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
                to={user ? "/about" : "/signup"}
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
                to={user ? "/statistics-chart" : "/signup"}
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
