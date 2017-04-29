import * as firebase from 'firebase';
import { firebase as firebaseConfig } from 'config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const cachePath = "public-cache/truffle-contracts/"

// TODO: Add Encryption here
// to hide contract data from firebase...
// store encryption key in a contract with owner 
// https://github.com/cisco/node-jose
// https://github.com/OR13/JOE

// not sure if i trust this...
const hashCode = (s) => {
    return s.split("")
        .reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
}

export const resolveKeyType = (key) => {
    return (typeof key === 'string') ? key : hashCode(JSON.stringify(key));
}

export const getItem = async (key) => {
    let resolvedKey = resolveKeyType(key);
    return db.ref(cachePath + resolvedKey)
        .once('value')
        .then((snapshot) => {
            let obj = snapshot.val();
            return obj;
        });
}

export const setItem = async (key, value) => {
    let resolvedKey = resolveKeyType(key);
    return db.ref(cachePath + resolvedKey)
        .set(value);
}



