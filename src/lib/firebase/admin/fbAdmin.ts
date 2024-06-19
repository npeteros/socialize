import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n")
}

export function initAdmin() {
    const params = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL as string,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY as string,
    }

    const privateKey = formatPrivateKey(params.privateKey)

    if (getApps().length > 0) {
        return getApp('admin');
    }


    return initializeApp({
        credential: cert({
            projectId: params.projectId,
            clientEmail: params.clientEmail,
            privateKey
        }),
        projectId: params.projectId,
        storageBucket: params.storageBucket
    }, 'admin');
}

