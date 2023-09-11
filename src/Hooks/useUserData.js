import {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { app } from "../firebase.js"

function useUserData() {

    const[user, setUser] = useState(null)
    const auth = getAuth(app);

    useEffect(() => {
        //onAuthStateChanged ustawia efekt i odpala się za każdą zmianą
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            //getCurrentUser
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                setUser(null);
            }
        });
        //trzeba odsubskrybować by apka się nie zapętlała, początkowe zajęcia
        return () => unsubscribe();
    }, [auth]);

        return user
}

export default useUserData;