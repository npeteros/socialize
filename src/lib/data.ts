import { doc, getDoc } from "firebase/firestore";
import { initFirestore } from "./firebase";

const db = initFirestore();

export async function retrieveUserByID(id: string) {
    const usersRef = doc(db, "users", id);
    const userSnap = await getDoc(usersRef);
    if (userSnap.exists()) return userSnap.data();
    return null;
}