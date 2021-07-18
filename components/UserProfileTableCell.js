import React from 'react';
import Image from 'next/image';

const UserProfileTableCell = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: 60, height: 60, marginRight: 16}}>
                <Image src='/assets/icons/ic_profile.png' width={60} height={60} alt=''/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: 18, fontWeight: 'bold'}}>홍길동</span>
                <span><span style={{color: '#797979', marginRight: 8}}>회원 등급</span><span>새싹</span></span>
                <span>남/ 1년차 / 병동</span>
                <span>010 8111 1111</span>
                <a style={{color: '#1379FF', cursor:'pointer'}}>프로필 상세 ></a>
            </div>
        </div>
    )
}

export default UserProfileTableCell;