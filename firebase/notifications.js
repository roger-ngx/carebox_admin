import firebase from './init';
import { map } from 'lodash';

export const addNotification = async (content) => {
    try{
        await firebase.firestore().collection('notifications').add({
            content,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }catch(ex){
        console.log('addNotification', ex);
    }
}

export const loadNotifications = async () => {
    try{
        const ret = await firebase.firestore().collection('notifications').orderBy('createdAt', 'desc').get();

        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}));
    }catch(ex){
        console.log('addNotification', ex);
    }
}