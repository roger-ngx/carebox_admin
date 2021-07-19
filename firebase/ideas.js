import firebase from './init';
import { map } from 'lodash';

export const getIdeas = async () => {
    try{
        const ret = await firebase.firestore().collection('ideas').orderBy('createdAt', 'desc').get();
        return map(ret.docs, doc => ({id: doc.id,  ...doc.data()}));
    }catch(ex){
        console.log('getIdeas', ex);
    }
    return [];
};

export const getIdeaComments = async ideaId => {
    console.log('idea', ideaId);
    if(!ideaId) return [];

    try{
        const ret = await firebase.firestore()
        .collection('ideas').doc(ideaId)
        .collection('comments').orderBy('createdAt', 'desc').get();

        return map(ret.docs, doc => ({id: doc.id,  ...doc.data()}));
    }catch(ex){
        console.log('getIdeas', ex);
    }
    return [];
}

export const getCommentReplies = async ({ideaId, commentId}) => {
    console.log('idea', ideaId);
    if(!ideaId) return [];

    try{
        const ret = await firebase.firestore()
        .collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId)
        .collection('replies')
        .orderBy('createdAt', 'desc').get();

        return map(ret.docs, doc => ({id: doc.id,  ...doc.data()}));
    }catch(ex){
        console.log('getIdeas', ex);
    }
    return [];
}