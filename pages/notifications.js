import { useState, useEffect } from 'react';
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
import moment from 'moment';
import { map } from 'lodash';

import CBSelect from '../components/CBSelect';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import UserProfileDialog from '../dialogs/UserProfileDialog';
import NotificationMakingDialog from '../dialogs/NotificationMakingDialog';
import { loadNotifications } from '../firebase/notifications';

const columns = [
    { field: 'id', headerName: '번호', width: 200 },
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

const NotificationListPage = () => {

    const [ openNotificationMaking, setOpenNotificationMaking ] = useState(false);
    const [ notifications, setNotifications ] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async() => {
        try{
            const data = await loadNotifications();
            setNotifications(map(data, 
                ({id, content, createdAt}) => ({
                    id,
                    content,
                    registrationDate: moment.unix(createdAt.seconds).format('YYYY.MM.DD HH:mm').toString()
                })
            ));
        }catch(ex){
            console.log(ex);
        }
    };

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
                        rows={notifications}
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
                    onSuccess={newNotification => {
                        if(newNotification){
                            setNotifications([newNotification, ...notifications]);
                        }else{
                            alert('failed');
                        }
                    }}
                />
            }
        </Layout>
    )
}

export default NotificationListPage;