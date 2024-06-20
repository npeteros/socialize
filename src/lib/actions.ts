"use server";

import { initFirebase, initFirestore, initStorage } from "./firebase/firebase";
import { collection, doc, getDoc, getDocs, or, query, setDoc, where } from "firebase/firestore";
import { Account, LoggableAccount, RegisterableAccount } from "./types";
import { compareSync, hashSync } from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import { getDownloadURL, ref } from "firebase/storage";

const app = initFirebase();
const db = initFirestore(app);
const storage = initStorage(app);

export async function checkUserExists(username: string, email: string) {

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

export async function signInWithCredentials(data: LoggableAccount) {
    const docRef = doc(db, 'users', data.username);
    const docSnapshot = await getDoc(docRef);

    let retVal = {
        status: 500,
        value: {
            msg: null
        }
    }

    if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        const user: Account = {
            email: docData.email,
            displayName: docData.displayName,
            username: docData.username,
            imgUrl: docData.imgUrl,
            bio: docData.bio
        }

        const verified = compareSync(data.password, docData.password);
        if (verified) {
            const token = sign({ id: docData.id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '1h' })
            return { ...retVal, status: 200, value: { token, user } }
        }
    }
    return { ...retVal, value: { error: 'Invalid credentials' } }
}

export async function signUp(formData: RegisterableAccount) {
    let data = { ...formData, id: uuidv4() }
    data.password = hashSync(data.password, 10);
    data.bio = 'No bio.';
    let retVal = { status: 500, msg: '' }

    const defaultProfileRef = ref(storage, 'profile-pictures/default.jpg');
    await getDownloadURL(defaultProfileRef)
        .then(url => {
            data = { ...data, imgUrl: `${url}.jpg` }
        })

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