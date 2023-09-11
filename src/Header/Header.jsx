import styles from './header.module.scss'
import {NavLink} from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {useEffect, useState} from "react";

// import {
//     HashRouter as Router,
//     Routes,
//     Route,
//     Link,
//     Outlet,
//     NavLink,
// } from 'react-router-dom';

function Header(props) {

    const[userEmail, setUserEmail] = useState(null)

    const auth = getAuth();

    useEffect(() => {
        //onAuthStateChanged ustawia efekt i odpala się za każdą zmianą
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });
        //trzeba odsubskrybować by apka się nie zapętlała
        return () => unsubscribe();
    }, [auth]);




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
                            <span className={`${styles.span} material-symbols-outlined`}>account_circle</span>{userEmail ? userEmail : "Not logged in"}
                            {/*alternatywnie span z user można zapisać: userEmail || "not logged in"*/}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

        </header>
    );
}

export default Header;