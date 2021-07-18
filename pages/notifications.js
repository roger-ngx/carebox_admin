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
import UserProfileDialog from '../dialogs/UserProfileDialog';
import NotificationMakingDialog from '../dialogs/NotificationMakingDialog';

const columns = [
    { field: 'id', headerName: '번호', width: 90 },
    {
        field: 'content',
        headerName: '내용',
        flex: 1,
        editable: true,
    },
    {
        field: 'registrationDate',
        headerName: '등록일',
        width: 200,
        editable: true,
    }
];

const rows = [
    { id: 100, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
    { id: 101, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
    { id: 102, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
    { id: 103, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
    { id: 104, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
    { id: 105, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
    { id: 106, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
    { id: 107, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
    { id: 108, content: '전체 공지입니다. 아이디어 등록하실 때 꼭 스캠퍼 기법을 사용해 주세요!', registrationDate: '2021.04.26 14:33' },
];

const NotificationListPage = () => {

    const [ openNotificationMaking, setOpenNotificationMaking ] = useState(false);

    return (
        <Layout>
            <div style={{display: 'flex', flexDirection: 'column', padding: 20, flex: 1}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <span style={{fontSize: 26, fontWeight: 'bold'}}>공지사항</span>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <CBSelect containerStyle={{marginRight: 8}}/>
                        <SearchInput />
                    </div>
                </div>
                <div style={{marginTop: 32, textAlign: 'right'}}>
                    <a
                        style={{padding: '8px 24px', backgroundColor: '#1379FF', color: 'white', cursor:'pointer'}}
                        onClick={() => setOpenNotificationMaking(true)}
                    >
                        등록
                    </a>
                </div>
                <div style={{ flex: 1, marginTop: 24 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                    />
                </div>
            </div>
            {
                openNotificationMaking &&
                <NotificationMakingDialog
                    open={openNotificationMaking}
                    setOpen={setOpenNotificationMaking}
                />
            }
        </Layout>
    )
}

export default NotificationListPage;