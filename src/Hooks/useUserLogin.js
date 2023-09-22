import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase.js";

function useUserLogin() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //getCurrentUser
      if (user) {
        setUser(user);
        //console.log(user)
      } else {
        setUser(null);
      }
    });
    //trzeba odsubskrybować by apka się nie zapętlała, początkowe zajęcia
    return () => unsubscribe();
  }, [auth]);

  return user;
}

export default useUserLogin;
