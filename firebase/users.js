import firebase from './init';
import { map, compact } from 'lodash';

export const checkAvailablePhoneNumberForLogin = async () => {
    try{
        const ret = await firebase.firestore().collection('adminUsers').get();
        return compact(map(ret.docs, doc => doc.data().phoneNumber));
    }catch(ex){
        console.log('checkAvailablePhoneNumberForLogin', ex);
    }
};

export const getUsers = async () => {
    try{
        const ret = await firebase.firestore().collection('users').orderBy('createdAt', 'desc').get();
        return map(ret.docs, doc => ({uid: doc.id,  ...doc.data()}));
    }catch(ex){
        console.log('getUsers', ex);
    }
    return [];
};

export const getUserById = async (uid) => {
    try{
        const ret = await firebase.firestore().collection('users').doc(uid).get();
        return ({uid: ret.id,  ...ret.data()});
    }catch(ex){
        console.log('getUsers', ex);
    }
    return [];
};

export const changeUserGrade = async (uid, grade) => {
    try{
        await firebase.firestore().collection('users').doc(uid).update({
            grade,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    }catch(ex){
        console.log('getUsers', ex);
    }
    return false;
}