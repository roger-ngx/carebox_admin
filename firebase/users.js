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
        console.log('getUserById', ex);
    }
    return [];
};

export const getUsersByNickname = async (nickName) => {
    try{
        const ret = await firebase.firestore().collection('users')
            .where('nickName', '==', nickName).get();

        return map(ret.docs, doc => ({uid: doc.id,  ...doc.data()}));
    }catch(ex){
        console.log('getUserByNickname', ex);
    }
    return [];
};

export const getUsersByPhonenumber = async (phoneNumber) => {
    if(!phoneNumber) return;

    phoneNumber = phoneNumber.replace('0', '+82');
    try{
        const ret = await firebase.firestore().collection('users')
            .where('phoneNumber', '==', phoneNumber).get();

        return map(ret.docs, doc => ({uid: doc.id,  ...doc.data()}));
    }catch(ex){
        console.log('getUserByPhonenumber', ex);
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
        console.log('changeUserGrade', ex);
    }
    return false;
}

export const getUserRegisteredIdeasAndComments = async (uid) => {
    try{
        const comments = await firebase.firestore().collection('history').doc(uid).collection('comments').get();

        const ideas = await firebase.firestore().collection('ideas').where('ownerId', '==', uid).get();

        return ({comments: comments.docs.length,  ideas: ideas.docs.length});
    }catch(ex){
        console.log('getUserRegisteredIdeasAndComments', ex);
    }
}