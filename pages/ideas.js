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
import Divider from '@material-ui/core/Divider';

import CBSelect from '../components/CBSelect';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import { ArrowForwardIos } from '@material-ui/icons';

const columns = [
    { field: 'id', headerName: '번호', width: 90 },
    {
      field: 'ideaType',
      headerName: '아이디어 구분',
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
      field: 'category',
      headerName: '카테고리',
      width: 110,
      editable: true,
    },
    {
      field: 'title',
      headerName: '제목',
      width: 350,
    },
    {
        field: 'scamper',
        headerName: 'scamper',
        width: 250,
        editable: true,
    },
    {
        field: 'createdAt',
        headerName: '등록일',
        width: 250,
        editable: true,
    },
    {
        field: 'pickedMembers',
        headerName: 'pick된 회원',
        width: 250,
        editable: true,
    },   
];

const rows = [
    { id: 100, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 101, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 102, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 103, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 104, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 105, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 106, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 107, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 108, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
    { id: 109, ideaType: '일반', nickName: '홍길동', category: '기계', title: '간호 아이디어 공유합니다 많이 참여해...', scamper: 'p 용도의 전환, s 역발상', createdAt: '2021.04.26 14:33', pickedMembers: '간호왕, 왕왕왕, ㅇㅇㅇ'},
];

const Item = ({leftText, rightText}) => (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '8px 0'}}>
        <span style={{width: 120, textAlign: 'right', color: '#878787'}}>{leftText}</span>
        <span style={{color: '#C4C4C4', margin: '0 8px'}}>|</span>
        <span style={{color: '#323030'}}>{rightText}</span>
    </div>
)

const IdeaListPage = () => {

    const [ open, setOpen ] = useState(false);

    return (
        <Layout>
            <div style={{display: 'flex', flexDirection: 'column', padding: 20, flex: 1}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <span style={{fontSize: 26, fontWeight: 'bold'}}>아이디어 리스트</span>
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
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{display: 'flex', flexDirection: 'column', marginRight: 20}}>
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
                                    <Item
                                        leftText='카테고리'
                                        rightText='기계'
                                    />
                                    <Item
                                        leftText='아이디어 종류'
                                        rightText='이미 있던것의 발전'
                                    />
                                    <Item
                                        leftText='스캠퍼'
                                        rightText='P 용도의 전환 / R 역발상'
                                    />
                                    <Divider />
                                    <Item
                                        leftText='제목'
                                        rightText='간호 아이디어 공유합니다 많이 참여해주세요!'
                                    />
                                    <Divider />
                                    <Item
                                        leftText='구체적 대상'
                                        rightText='산소 마스크'
                                    />
                                    <Item
                                        leftText='구체적 상황'
                                        rightText='산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격'
                                    />
                                    <Item
                                        leftText='해결 방법'
                                        rightText='1회용 필터를 갈아 끼우는 형태로 제안합니다.'
                                    />
                                    <Divider />

                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#EEF6FF', width: 300, padding: 20}}>
                                <div style={{marginBottom: 48}}>
                                    <span style={{fontWeight: 'bold', fontSize: 15}}>등록된 코멘트</span>
                                    <Divider style={{margin: '8px 0'}}/>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <span>5개</span>
                                        <ArrowForwardIos color='#686868' style={{fontSize:16}}/>
                                    </div>
                                </div>

                                <div>
                                    <span style={{fontWeight: 'bold', fontSize: 15}}>PICK</span>
                                    <Divider style={{margin: '8px 0'}}/>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <span>5명</span>
                                        <ArrowForwardIos color='#686868' style={{fontSize:16}}/>
                                    </div>
                                </div>
                            </div>
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

export default IdeaListPage;