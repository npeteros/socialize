"use server";

import { initFirestore, initStorage } from "./firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { LoggableAccount } from "./types";
import { hashSync } from 'bcryptjs';
import { getDownloadURL, ref } from "firebase/storage";

const db = initFirestore();
const storage = initStorage();

export async function addUserToFirestore(formData: LoggableAccount) {
    let data = { ...formData }
    data.password = hashSync(data.password, 10);
    data.bio = 'No bio.';

    const defaultProfileRef = ref(storage, 'profile-pictures/default.png');
    await getDownloadURL(defaultProfileRef)
        .then(url => {
            data = { ...data, imgUrl: `${url}.png` }
        })

    try {
        const userRef = doc(db, "users", data.email);
        await setDoc(userRef, data)
        console.log("Document written with ID: ", data.email);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}