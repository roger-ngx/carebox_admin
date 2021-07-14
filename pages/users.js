import { useState } from 'react';
import Image from 'next/image'
import { DataGrid } from '@material-ui/data-grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import CBSelect from '../components/CBSelect';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';

const columns = [
    { field: 'id', headerName: '번호', width: 90 },
    {
      field: 'pick',
      headerName: 'pick 여부',
      width: 150,
      editable: true,
    },
    {
      field: 'nickName',
      headerName: '닉네임',
      width: 150,
      editable: true,
    },
    {
      field: 'gender',
      headerName: '성별',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'yearsOnJob',
      headerName: '연차',
      width: 160,
    },
    {
        field: 'jobKind',
        headerName: '간호 직군',
        width: 150,
        editable: true,
    },
    {
        field: 'phoneNumber',
        headerName: '휴대폰 번호',
        width: 250,
        editable: true,
    },
    {
        field: 'registeredIdeaCount',
        headerName: '등록 아이디어 수',
        width: 250,
        editable: true,
    },
    {
        field: 'registeredCommentCount',
        headerName: '등록 코멘트 수',
        width: 250,
        editable: true,
    }, 
    {
        field: 'registrationDate',
        headerName: '가입일',
        width: 250,
        editable: true,
    }, 
    {
        field: 'lastLoginTime',
        headerName: '최근 로그인',
        width: 250,
        editable: true,
    },   
];

const rows = [
    { id: 100, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 101, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 102, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 103, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 104, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 105, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 106, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 107, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 108, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
    { id: 109, pick: 'pick', nickName: '홍길동', gender: '남', yearsOnJob: '1년', jobKind: '병동', phoneNumber: ' 010-1111-2222', registeredIdeaCount: 0, registeredCommentCount: 0, registrationDate: '2021.04.26 14:33', lastLoginTime: '2021.04.26 14:33' },
];

const UserListPage = () => {

    const [ open, setOpen ] = useState(false);

    return (
        <Layout>
            <div style={{display: 'flex', flexDirection: 'column', padding: 20, flex: 1}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <span style={{fontSize: 26, fontWeight: 'bold'}}>회원 리스트</span>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" />}
                            label="pick된 회원만 보기"
                            labelPlacement="start"
                            style={{marginRight: 16}}
                        />
                        <CBSelect containerStyle={{marginRight: 8}}/>
                        <SearchInput />
                    </div>
                </div>
                <div style={{ flex: 1, marginTop: 24 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        onRowClick={() => setOpen(true)}
                    />
                </div>

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
            </div>
        </Layout>
    )
}

export default UserListPage;