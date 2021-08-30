import React, { useState } from 'react';
import { throttle } from 'lodash';

import { changeUserGrade } from '../firebase/users';
import { CircularProgress } from '@material-ui/core';

const UserGrade = ({uid, grade, onSuccess}) => {

    console.log('grade', grade);

    const [ userGrade, setUserGrade ] = useState(grade);
    const [ loading, setLoading ] = useState(false);

    const changeGrade = async () => {
        setLoading(true);
        try{
            const nextGrade = userGrade===4?1:(userGrade+1);

            await changeUserGrade(uid, nextGrade);
            setUserGrade(nextGrade);
            onSuccess(uid, nextGrade);
        }catch(ex){
            console.log('changeGrade', ex);
        }
        setLoading(false);
    };

    const getUserGrade = (userGrade) => {
        switch(userGrade){
            case 1: return '새싹';
            case 1: return '나무';
            case 1: return '숲';
            case 1: return '왕관';
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
            <div style={{display: 'flex', flexDirection: 'row', marginRight: 16}}>
                <span style={{color: '#797979', marginRight: 4}}>회원 등급</span>
                <span>{getUserGrade(userGrade)}</span>
            </div>
            <div
                style={{cursor: 'pointer', backgroundColor: '#1379FF', padding: 4, width: 80, textAlign: 'center'}}
                onClick={throttle(changeGrade, 3000, {trailing: false})}
            >
                {
                    loading ?
                    <CircularProgress size={12} style={{color:'#fff'}} />
                    :
                    <span style={{color: 'white'}}>{userGrade < 4 ? '등급 up' : '등급 down'}</span>
                }
            </div>
        </div>
    )
}

export default UserGrade;