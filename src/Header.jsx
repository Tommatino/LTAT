import styles from './header.module.scss'
import {NavLink} from "react-router-dom";

// import {
//     HashRouter as Router,
//     Routes,
//     Route,
//     Link,
//     Outlet,
//     NavLink,
// } from 'react-router-dom';

function Header(props) {
    return (
        <header className={`${styles.header}`}>
            <div className={`${styles.header_container} container`}>
                <a href={"/"} className={styles.logo}>LTAT</a>
                <nav className={styles.menu}>
                    <ul className={styles.menu_nav}>
                        <li className={styles.li}>
                            <NavLink to={"/"} style={({isActive}) => isActive ? {color: 'green'} : {}} end>Strona główna</NavLink>
                        </li>
                        <li className={styles.li}>
                            <NavLink to={"/about"} style={({isActive}) => isActive ? {color: 'green'} : {}} end>O aplikacji</NavLink>
                        </li>
                        <li className={styles.li}>
                            <NavLink to={"/statistics"} className={styles.NavLink} style={({isActive}) => isActive ? {color: 'green'} : {}} end>
                            <span className={`${styles.span} material-symbols-outlined`}>account_circle</span>User
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

        </header>
    );
}

export default Header;