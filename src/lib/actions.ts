"use server";

import { initFirestore, initStorage } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Account, AccountWithID } from "./types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const db = initFirestore();
const storage = initStorage();

export async function storeEmailUser(formData: AccountWithID) {
    const userRef = doc(db, "users", formData.id);
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) return;

    formData.bio = 'No bio.';

    const defaultAvatarRef = ref(storage, 'avatars/default.png');
    await getDownloadURL(defaultAvatarRef)
        .then(url => {
            formData = { ...formData, imgUrl: `${url}.png` }
        })

    try {
        await setDoc(userRef, formData)
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export async function storeOAuthUser(user: AccountWithID) {
    const userRef = doc(db, "users", user.id);
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) return;

    try {
        const response = await fetch(user.imgUrl, { cache: 'no-store' })
        const blob = await response.blob();

        const avatarsRef = ref(storage, `avatars/${user.id}/avatar.jpg`);
        await uploadBytes(avatarsRef, blob).then(() => {
            console.log('Stored user avatar!');
        });

        await getDownloadURL(avatarsRef)
            .then(url => {
                user.imgUrl = `${url}.jpg`;
            })

        await setDoc(userRef, user)

        console.log("Document written with ID: ", user.email);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export async function editProfile(userId: string, data: Account, file: File) {
    if (file) {
        const avatarsRef = ref(storage, `avatars/${userId}/avatar.jpg`);
        uploadBytes(avatarsRef, file).then(() => {
            console.log('Stored user avatar!');
        });

        await getDownloadURL(avatarsRef)
            .then(url => {
                console.log("URL HERE: ", url);

                data = { ...data, imgUrl: `${url}.jpg` };
            })
    }

    const usersRef = doc(db, "users", userId);
    setDoc(usersRef, data)
    return data;

}