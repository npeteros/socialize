"use server";

import { initFirestore, initStorage } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AccountWithID } from "./types";
import { hashSync } from 'bcryptjs';
import { getDownloadURL, ref } from "firebase/storage";
import { User } from "firebase/auth";

const db = initFirestore();
const storage = initStorage();

export async function storeEmailUser(formData: AccountWithID) {
    const userRef = doc(db, "users", formData.email);
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) return;

    formData.bio = 'No bio.';

    const defaultProfileRef = ref(storage, 'profile-pictures/default.png');
    await getDownloadURL(defaultProfileRef)
        .then(url => {
            formData = { ...formData, imgUrl: `${url}.png` }
        })

    try {
        await setDoc(userRef, formData)
        console.log("Document written with ID: ", formData.email);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export async function storeOAuthUser(user: AccountWithID) {
    const userRef = doc(db, "users", user.email);
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) return;

    try {
        await setDoc(userRef, user)
        console.log("Document written with ID: ", user.email);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export async function retrieveUserByEmail(email: string) {
    const usersRef = doc(db, "users", email);
    const userSnap = await getDoc(usersRef);
    if (userSnap.exists()) return userSnap.data();
    return null;
}