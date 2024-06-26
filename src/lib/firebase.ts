
import { initializeApp, FirebaseOptions, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const params: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
}

export function initFirebase() {

    if (getApps().length > 0) {
        return getApp();
    }

    return initializeApp({
        apiKey: params.apiKey,
        appId: params.apiKey,
        authDomain: params.authDomain,
        messagingSenderId: params.messagingSenderId,
        projectId: params.projectId,
        storageBucket: params.storageBucket,
    })

}
const app = initFirebase();
export const initAuth = () => getAuth(app);
export const initFirestore = () => getFirestore(app);
export const initStorage = () => getStorage(app, params.storageBucket);