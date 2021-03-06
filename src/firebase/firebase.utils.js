import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBuB96qgeZR7-EHCUA5CjmFXc15vnvTtow",
    authDomain: "crwn-db-4f55c.firebaseapp.com",
    projectId: "crwn-db-4f55c",
    storageBucket: "crwn-db-4f55c.appspot.com",
    messagingSenderId: "913897227541",
    appId: "1:913897227541:web:c1b9f12b2d26cc6407951c",
    measurementId: "G-3NJV7XHT6D"
};


/**
 * control de la logica de persistencia relacionado a la autenticacion
 */
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;