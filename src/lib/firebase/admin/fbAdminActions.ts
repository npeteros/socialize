import { getAuth } from "firebase-admin/auth";
import { initAdmin } from "./fbAdmin";
import { v4 as uuidv4 } from "uuid";
import { LoggableAccount } from "@/lib/types";
import { initFirebase, initFirestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { compareSync } from "bcryptjs";

export async function createValidatedToken(data: LoggableAccount) {
    const admin = initAdmin();
    const app = initFirebase();
    const db = initFirestore(app);
    const uid = uuidv4();
    let token;

    const docRef = doc(db, 'users', data.username);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        const { password } = docSnapshot.data();
        const verified = compareSync(data.password, password);
        if (verified) {
            token = await getAuth(admin)
                .createCustomToken(uid)
                .then((customToken) => {
                    return customToken
                })
                .catch((error) => {
                    console.log('Error creating custom token:', error); 
                });
        }
    }
    return token;
}