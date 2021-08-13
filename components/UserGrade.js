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
            await changeUserGrade(uid, userGrade===1?2:1)
            setUserGrade(userGrade===1?2:1);
            onSuccess(uid, userGrade===1?2:1);
        }catch(ex){
            console.log('changeGrade', ex);
        }
        setLoading(false);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
            <div style={{display: 'flex', flexDirection: 'row', marginRight: 16}}>
                <span style={{color: '#797979', marginRight: 4}}>회원 등급</span>
                <span>{userGrade === 1 ? '새싹' : '왕관'}</span>
            </div>
            <div
                style={{cursor: 'pointer', backgroundColor: '#1379FF', padding: 4, width: 80, textAlign: 'center'}}
                onClick={throttle(changeGrade, 3000, {trailing: false})}
            >
                {
                    loading ?
                    <CircularProgress size={12} style={{color:'#fff'}} />
                    :
                    <span style={{color: 'white'}}>{userGrade === 1 ? '등급 up' : '등급 down'}</span>
                }
            </div>
        </div>
    )
}

export default UserGrade;