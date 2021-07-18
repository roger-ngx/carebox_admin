import firebase from './init';
import { map, compact } from 'lodash';

export const checkAvailablePhoneNumberForLogin = async () => {
    try{
        const ret = await firebase.firestore().collection('adminUsers').get();
        return compact(map(ret.docs, doc => doc.data().phoneNumber));
    }catch(ex){
        console.log(ex);
    }
};