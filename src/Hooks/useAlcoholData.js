import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  deleteField,
} from "firebase/firestore";
import { db, app } from "../firebase.js";
import { getAuth } from "firebase/auth";

function useAlcoholData() {
  const currentDay = new Date().toISOString().split("T")[0];
  //format rok, miesiąc, dzień
  const auth = getAuth(app);

  const getAlcoholDay = async () => {
    const q = query(
      collection(db, "alcoholStatistics"),
      where("user", "==", auth.currentUser.uid),
    );
    const querySnapshot = await getDocs(q);
    let documentData;
    querySnapshot.forEach((doc) => {
      documentData = doc.data();
    });
    return documentData?.[currentDay] || 0;
  };

  const setAlcoholDay = async (alcohol, prevAlcoholState, user) => {
    const alcoholStatisticsRef = collection(db, "alcoholStatistics");
    const prevAlcoholData = await getAlcoholData();
    await setDoc(doc(alcoholStatisticsRef, auth.currentUser.uid), {
      ...prevAlcoholData,
      [currentDay]: alcohol + prevAlcoholState,
      user: user,
    });
    //setDoc zamiast updateDoc ponieważ chcemy tworzyć nowy dokument, updateDoc nie działałby gdyby trzebabyło stworzyć nowy doc gdy nie było wcześniej danych
  };

  const getAlcoholData = async () => {
    const q = query(
      collection(db, "alcoholStatistics"),
      where("user", "==", auth.currentUser.uid),
    );
    const querySnapshot = await getDocs(q);
    let documentData;
    querySnapshot.forEach((doc) => {
      documentData = doc.data();
    });
    if (!documentData) {
      return {};
    }
    // eslint-disable-next-line no-unused-vars
    const { user, ...alcoholData } = documentData;
    return alcoholData;
  };

  const delAlcoholDay = async (chosenDay) => {
    // eslint-disable-next-line no-unused-vars
    const { [chosenDay]: dayToDelete, ...otherDays } = await getAlcoholData();
    //const alcoholStatisticsRef = collection(db, "alcoholStatistics");
    await setDoc(doc(db, "alcoholStatistics", auth.currentUser.uid), {
      ...otherDays,
      user: auth.currentUser.uid,
    });

    // const q = query(
    //   collection(db, "alcoholStatistics"),
    //   where("user", "==", auth.currentUser.uid),
    // );
    // await updateDoc(q, { [chosenDay]: deleteField() });
  };

  return { setAlcoholDay, getAlcoholDay, getAlcoholData, delAlcoholDay };
}

export default useAlcoholData;
