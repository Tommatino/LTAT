import { getAuth } from "firebase/auth";
import { app, db } from "../firebase.js";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

function useUserParameters() {
  const auth = getAuth(app);
  const getUserParam = async () => {
    const docUserParamRef = doc(db, "userParameters", auth.currentUser.uid);
    const docSnap = await getDoc(docUserParamRef);
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  };

  return { getUserParam };
}

export default useUserParameters;
