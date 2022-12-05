import {initializeApp} from 'firebase/app';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// import {getAnalytics} from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAwMBdfABsyazHzyYSgD7331UwY7ytXmis",
    authDomain: "cool-project-23a66.firebaseapp.com",
    projectId: "cool-project-23a66",
    storageBucket: "cool-project-23a66.appspot.com",
    messagingSenderId: "267624618564",
    appId: "1:267624618564:web:a6122397df6402ab4efa11",
    measurementId: "G-S1JMD1RWQQ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);

export async function getTokens(req, res) {
    const docRef = doc(db, 'tokens', 'tokens');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
}

export async function checkToken(token) {
    const {tokens} = await getTokens();

    return !!tokens.includes(token);
}

export async function setToken(token) {
    try {
        const {tokens} = await getTokens();

        if (tokens.includes(token)) return true;

        await setDoc(doc(db, 'tokens', 'tokens'), {
            tokens: [...tokens, token],
        });

        return true;
    } catch (e) {
        return false;
    }
}

export async function getRecords(id) {
    const docRef = doc(db, 'records', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
}

export async function setRecords(id, arr) {
    try {
        if (!id || arr === []) return false;

        // const {records} = await getRecords(id);

        await setDoc(doc(db, 'records', id.toString()), {
            records: arr,
        });

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


