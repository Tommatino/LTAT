import styles from './header.module.scss'

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
                        <li><a href={"/"}>Strona główna</a></li>
                        <li><a href={"/"}>O aplikacji</a></li>
                        <li><a href={"/"}>Statystyki</a></li>
                        <li>
                            <a href={"/"}>
                                <span className="material-symbols-outlined">account_circle</span>User
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

        </header>
    );
}

export default Header;