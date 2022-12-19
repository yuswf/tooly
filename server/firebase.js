const {initializeApp} = require('firebase/app');
const {getFirestore, collection, getDocs} = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAwMBdfABsyazHzyYSgD7331UwY7ytXmis",
    authDomain: "cool-project-23a66.firebaseapp.com",
    projectId: "cool-project-23a66",
    storageBucket: "cool-project-23a66.appspot.com",
    messagingSenderId: "267624618564",
    appId: "1:267624618564:web:a6122397df6402ab4efa11",
    measurementId: "G-S1JMD1RWQQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getRecords() {
    const arr = [];
    const querySnapshot = await getDocs(collection(db, "records"));
    
    querySnapshot.forEach((doc) => {
        arr.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return arr;
}

module.exports = {
    getRecords,
    db,
    app
}
