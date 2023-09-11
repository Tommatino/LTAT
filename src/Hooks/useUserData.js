import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";

function useUserData() {

    const[user, setUser] = useState(null)

    const auth = getAuth();

    useEffect(() => {
        //onAuthStateChanged ustawia efekt i odpala się za każdą zmianą
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        //trzeba odsubskrybować by apka się nie zapętlała
        return () => unsubscribe();
    }, [auth]);

        return user
}

export default useUserData;