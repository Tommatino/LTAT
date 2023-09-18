import { getAuth } from "firebase/auth";
import { app, db } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore";

function useUserParameters() {
  const auth = getAuth(app);
  const getUserParam = async () => {
    const q = query(
      collection(db, "userParameters"),
      where("user", "==", auth.currentUser.uid),
    );

    const querySnapshot = await getDocs(q);
    let documentData;
    querySnapshot.forEach((doc) => {
      documentData = doc.data();
      console.log(doc.id, " => ", doc.data());
    });
    return documentData;
  };

  return { getUserParam };
}

export default useUserParameters;
