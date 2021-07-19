import firebase from './init';

export async function addNotification(content){
    try{
        await firebase.functions().collection('notification').add({
            content,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }catch(ex){
        console.log('addNotification', ex);
    }
}