import firebase from './init';
import { map } from 'lodash';

export const addNotification = async (content) => {
    try{
        const res = await firebase.firestore().collection('notifications').add({
            content,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            type: 'ADMIN',
            available: true
        });
        console.log(res);

        return ({id: res.id, content});
    }catch(ex){
        console.log('addNotification', ex);
    }
    return null;
}

export const loadNotifications = async () => {
    try{
        const ret = await firebase.firestore().collection('notifications').orderBy('createdAt', 'desc').get();

        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}));
    }catch(ex){
        console.log('addNotification', ex);
    }
}

export const setNotificationVisibility = async ({notificationId, available}) => {

    try{
        await firebase.firestore().collection('notifications')
            .doc(notificationId)
            .update({
                available,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        return true;
    }catch(ex){
        console.log('setNotificationVisibility', ex);
    }
    return false;
};