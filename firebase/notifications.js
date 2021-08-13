import firebase from './init';
import { map } from 'lodash';

export const addNotification = async (content) => {
    try{
        const res = await firebase.firestore().collection('notifications').add({
            content,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
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