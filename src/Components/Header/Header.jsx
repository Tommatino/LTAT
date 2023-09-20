import styles from "./header.module.scss";
import { NavLink } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";
import useUserLogin from "../../Hooks/useUserLogin.js";
import { useState } from "react";

function Header() {
  const user = useUserLogin();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header_container} container`}>
        <a href={user ? "/" : "/signup"} className={styles.logo}>
          LTAT
        </a>
        <button
          className={styles.hamburger}
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          {/* icon from Heroicons.com */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <nav className={`${styles.menu} ${isNavExpanded && styles.expanded}`}>
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
                // className={styles.NavLink}
                style={({ isActive }) =>
                  isActive && user
                    ? { color: "#0BDA51", fontSize: "1.15rem" }
                    : {}
                }
                end
              >
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
