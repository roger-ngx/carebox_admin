import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { map } from 'lodash';

import CBSelect from '../components/CBSelect';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import IdeaDetailDialog from '../dialogs/IdeaDetailDialog';
import { getIdeas } from '../firebase/ideas';
import { Idea } from '../models/Idea';

const columns = [
    { field: 'id', headerName: '번호', width: 200 },
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
      field: 'subject',
      headerName: '제목',
      width: 350,
    },
    {
        field: 'scampers',
        headerName: 'scampers',
        width: 250,
        editable: true,
    },
    {
        field: 'registrationDate',
        headerName: '등록일',
        width: 250,
        editable: true,
    },
    {
        field: 'pickedUsers',
        headerName: 'pick된 회원',
        width: 250,
        editable: true,
    },   
];

const IdeaListPage = () => {

    const [ open, setOpen ] = useState(false);
    const [ ideas, setIdeas ] = useState();
    const [ formattedIdeas, setFormattedIdeas ] = useState([]);
    const [ selectedRow, setSelectedRow ] = useState();

    useEffect(() => {
        getIdeas().then(setIdeas);
    }, []);

    useEffect(() => {
        const data = map(ideas, idea => {
            const row = new Idea(idea);

            return ({
                id: row.id,
                ideaType: '일반',
                nickName: row.ownerNickname,
                category: row.category,
                subject: row.subject,
                scampers: row.scampers,
                registrationDate: row.registrationDate,
                pickedUsers: row.pickedUsers,
                owner: row.owner,
                detail: row.detail
            });
        });

        setFormattedIdeas(data);
    }, [ideas]);

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
                        rows={formattedIdeas}
                        columns={columns}
                        pageSize={10}
                        onRowClick={(param) => {
                            setOpen(true)
                            setSelectedRow(param.row);
                        }}
                    />
                </div>
            </div>
            <IdeaDetailDialog {...{open, setOpen}} data={selectedRow}/>
        </Layout>
    )
}

export default IdeaListPage;