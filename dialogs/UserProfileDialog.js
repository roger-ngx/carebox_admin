import React from 'react';
import { useState } from 'react';
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

const UserProfileDialog = ({open, setOpen}) => {

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
                            <span style={{fontSize: 20, fontWeight: 'bold', marginRight: 8}}>홍길동</span>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span>남/ 1년차 / 병동</span>
                                <span style={{color: '#797979'}}>010 8111 1111</span>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
                            <div style={{display: 'flex', flexDirection: 'row', marginRight: 24}}>
                                <span style={{color: '#797979', marginRight: 4}}>유입 경로</span>
                                <span>앱스토어</span>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <span style={{color: '#797979', marginRight: 4}}>최근 접속</span>
                                <span>21.03.02 17:00</span>
                            </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                            <div style={{display: 'flex', flexDirection: 'row', marginRight: 16}}>
                                <span style={{color: '#797979', marginRight: 4}}>회원 등급</span>
                                <span>새싹</span>
                            </div>
                            <div style={{backgroundColor: '#1379FF', padding: 4}}>
                                <span style={{color: 'white'}}>등급 up</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#BEBEBE', padding: '20px 0'}}>
                    <span>등록 아이디어  12개</span>
                    <span>등록한 코멘트 12개</span>
                </div>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant='outlined'>
                    취소
                </Button>
                <Button onClick={() => setOpen(false)} variant='contained' color="primary">
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserProfileDialog;