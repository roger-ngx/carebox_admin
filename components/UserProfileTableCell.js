import React from 'react';

const UserProfileTableCell = ({user}) => {
    if(!user) return null;

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: 60, height: 60, marginRight: 16}}>
                <img src={user.profileImageUrl || '/assets/icons/ic_profile.png'} width={60} height={60} alt=''/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: 18, fontWeight: 'bold'}}>{user.nickName}</span>
                <span><span style={{color: '#797979', marginRight: 8}}>회원 등급</span><span>새싹</span></span>
                <span>{user.gender==='M' ? '남' : '여'}/ {user.yearsOnJob}년차 / {user.department}</span>
                <span>{user.phoneNumber}</span>
                <a style={{color: '#1379FF', cursor:'pointer'}}>{`프로필 상세 >`}</a>
            </div>
        </div>
    )
}

export default UserProfileTableCell;