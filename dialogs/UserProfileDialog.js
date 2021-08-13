import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DataGrid } from '@material-ui/data-grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import UserGrade from '../components/UserGrade';

const UserProfileDialog = ({data, open, setOpen, onUpdateGrade}) => {
    if(!data) return null;

    const { id, grade, nickName, gender, phoneNumber, yearsOnJob, department, lastLoginTime, registeredIdeaCount, registeredCommentCount } = data;

    return (
        <Dialog maxWidth='lg' open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">회원 정보</DialogTitle>
            <DialogContent>
                <div style={{display: 'flex', flexDirection: 'row', paddingBottom: 20}}>
                    <div style={{width: 68, height: 68}}>
                        <Image src='/assets/icons/ic_profile.png' width={68} height={68} alt=''/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 16}}>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <span style={{fontSize: 20, fontWeight: 'bold', marginRight: 12}}>{nickName}</span>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span>{gender==='M' ? '남' : '여'}/ {yearsOnJob}년차 / {department}</span>
                                <span style={{color: '#797979', marginTop: 8}}>{phoneNumber}</span>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
                            <div style={{display: 'flex', flexDirection: 'row', marginRight: 24}}>
                                <span style={{color: '#797979', marginRight: 4}}>유입 경로</span>
                                <span>앱스토어</span>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <span style={{color: '#797979', marginRight: 4}}>최근 접속</span>
                                <span>{lastLoginTime}</span>
                            </div>
                        </div>

                        <UserGrade grade={grade} uid={id} onSuccess={onUpdateGrade}/>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#BEBEBE', padding: '20px 0'}}>
                    <span>등록 아이디어  {registeredIdeaCount}개</span>
                    <span style={{marginTop: 8}}>등록한 코멘트 {registeredCommentCount}개</span>
                </div>
                
            </DialogContent>
            <DialogActions style={{padding: '16px 24px'}}>
                {/* <Button onClick={() => setOpen(false)} variant='outlined' style={{width: 100}}>
                    취소
                </Button> */}
                <Button onClick={() => setOpen(false)} variant='contained' color="primary" style={{width: 100}}>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserProfileDialog;