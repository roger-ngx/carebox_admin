import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import CBSelect from '../components/CBSelect';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import IdeaDetailDialog from '../dialogs/IdeaDetailDialog';

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
            </div>
            <IdeaDetailDialog {...{open, setOpen}}/>
        </Layout>
    )
}

export default IdeaListPage;