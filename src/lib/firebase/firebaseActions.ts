"use server";

import { getAuth, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { initFirebase, initFirestore } from "./firebase";
import { addDoc, collection, doc, getDoc, getDocs, or, query, setDoc, where } from "firebase/firestore";
import { LoggableAccount, RegisterableAccount } from "../types";
import { hashSync } from 'bcryptjs';
import { createValidatedToken } from "./admin/fbAdminActions";
import { v4 as uuidv4 } from "uuid";

const app = initFirebase();

export async function signIn(data: LoggableAccount) {

    const auth = getAuth(app);
    const token = await createValidatedToken(data);
    if (token) {
        await signInWithCustomToken(auth, token)
            .then((userCredential) => {
                console.log("Successfully signed in user.");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(`Error signing in (${errorCode}): ${errorMessage}`);
            });
    }
}

export async function checkUserExists(username: string, email: string) {
    const db = initFirestore(app);

    const usersRef = collection(db, "users");
    try {
        const q = query(usersRef, or(
            where("username", "==", username),
            where("email", "==", email)
        ));
        const querySnapshot = await getDocs(q);

        const docRef = doc(db, 'users', username);
        const docSnapshot = await getDoc(docRef);

        if (!querySnapshot.empty || docSnapshot.exists()) return true;
        return false;
    } catch (error) {
        console.error("Error validating user: ", error);
    }
}

export async function signUp(formData: RegisterableAccount) {
    const db = initFirestore(app);
    const data = { ...formData, id: uuidv4() }
    data.password = hashSync(data.password, 10);
    let retVal = { status: 500, msg: '' }

    try {
        const existingUser = await checkUserExists(data.username, data.email);

        if (existingUser) return { ...retVal, msg: 'User already exists' };
        const userRef = doc(db, "users", data.username);
        await setDoc(userRef, data)
        console.log("Document written with ID: ", data.username);
        return { ...retVal, status: 200, msg: JSON.stringify(data) };
    } catch (error) {
        console.error("Error adding document: ", error);
    }
    return { ...retVal, msg: "An error occurred" };
}

export async function retrieveUser() {
    const auth = getAuth(app);
    console.log("U: ", auth.currentUser);

}