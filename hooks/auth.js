import { useState, useEffect } from 'react';
import firebase from '../firebase/init';

const formatAuthUser = user => ({
    uid: user.uid,
    phoneNumber: user.phoneNumber,
    displayName: user.displayName
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState();
    const [authLoading, setAuthLoading] = useState(true);

    const clear = () => {
        setAuthUser(null);
        setAuthLoading(true);
    };

    const authStateChanged = async (user) => {
        if (!user) {
          setAuthUser(null)
          setAuthLoading(false);
          return;
        }

        console.log(user);

        setAuthLoading(true);
        var formattedUser = formatAuthUser(user);
        setAuthUser(formattedUser);
        setAuthLoading(false);
    };

    const signOut = () => firebase.auth().signOut.then(clear);

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        authLoading,
        signOut,
    };
}