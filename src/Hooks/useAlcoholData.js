import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, app } from "../firebase.js";
import { getAuth } from "firebase/auth";
import { useState } from "react";

function useAlcoholData() {
  const currentDay = new Date().toISOString().split("T")[0];
  //format rok, miesiąc, dzień
  const auth = getAuth(app);

  const getAlcoholDay = async () => {
    const docRef = doc(db, "alcoholStatistics", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data()?.[currentDay] || 0;
    //day jest obiektem, [] dajemy aby użyć zmiennej
  };
  const setAlcoholDay = async (alcohol, prevAlcoholState) => {
    const alcoholStatisticsRef = collection(db, "alcoholStatistics");
    await setDoc(doc(alcoholStatisticsRef, auth.currentUser.uid), {
      [currentDay]: alcohol + prevAlcoholState,
    });
  };

  return { setAlcoholDay, getAlcoholDay };
}

export default useAlcoholData;
