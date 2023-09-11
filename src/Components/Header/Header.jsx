import styles from './header.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import { signOut } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {useEffect, useState} from "react";

import useUserData from "../../Hooks/useUserData.js";
import { app } from '../../firebase.js'

function Header() {
    const navigate = useNavigate()
    const auth = getAuth(app);
    const user = useUserData()
    console.log(user)

    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/login")
            })
            .catch((error) => {
                // An error occurred during sign-out.
                console.error('Sign-out error:', error);
            });
    }

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
                            <span className={`${styles.span} material-symbols-outlined`}>account_circle</span>{user && user?.email ? user.email : "Not logged in"}
                            {/*alternatywnie span z user można zapisać: user.email || "not logged in"*/}
                            {/*    znak zapytania używamy by uniknąć wyświetlania błędu w sytuacji gdy nie ma takiego obiektu*/}
                            </NavLink>
                        </li>
                        <li>
                            {user && <button onClick={handleLogOut} >Log out</button>}
                        </li>
                    </ul>
                </nav>
            </div>

        </header>
    );
}

export default Header;