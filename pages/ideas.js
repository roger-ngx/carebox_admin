import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { map, compact, size, join, find, throttle } from 'lodash';
import { IconButton, Button, CircularProgress } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import CBSelect from '../components/CBSelect';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import IdeaDetailDialog from '../dialogs/IdeaDetailDialog';
import { getIdeas, getIdeasByOwnerPhonenumber, getIdeasByOwnerNickname, setIdeaVisibility } from '../firebase/ideas';
import { Idea } from '../models/Idea';

const columns = [
    { field: 'id', headerName: '번호', width: 200 },
    {
      field: 'ideaType',
      headerName: '아이디어 구분',
      width: 150,
      editable: false,
    },
    {
      field: 'nickName',
      headerName: '닉네임',
      width: 150,
      editable: false,
    },
    {
      field: 'category',
      headerName: '카테고리',
      width: 110,
      editable: false,
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
        editable: false,
    },
    {
        field: 'registrationDate',
        headerName: '등록일',
        width: 250,
        editable: false,
    },
    {
        field: 'pickedUsernames',
        headerName: 'pick된 회원',
        width: 250,
        editable: false,
    },
    {
        field: 'isAvailable',
        headerName: '공개',
        width: 150,
        editable: false,
        renderCell: (params) => {

            const { value } = params;

            if(value === undefined){
                return null;
            };

            return <IconButton>
                {
                    params.value ? <VisibilityIcon /> : <VisibilityOffIcon />
                }
            </IconButton>
        }
    } 
];

export default function IdeaListPage(){

    const [ open, setOpen ] = useState(false);
    const [ ideas, setIdeas ] = useState();
    const [ formattedIdeas, setFormattedIdeas ] = useState([]);
    const [ selectedRow, setSelectedRow ] = useState();
    const [ onlyShowPickedIdea, setOnlyShowPickedIdea ] = useState(false);
    const [ searchingType, setSearchingType ] = useState();

    useEffect(() => {
        getIdeas().then(setIdeas);
    }, []);

    useEffect(() => {
        const data = map(ideas, idea => {
            const row = new Idea(idea);

            const data = ({
                id: row.id,
                ideaType: '일반',
                nickName: row.ownerNickname,
                category: row.category,
                subject: row.subject,
                scampers: row.scampers,
                registrationDate: row.registrationDate,
                pickedUsers: row.pickedUsers,
                pickedUsernames: join(row.pickedUsernames, ', '),
                owner: row.owner,
                detail: row.detail,
                rating: row.rating,
                isAvailable: row.isAvailable
            });

            if(!onlyShowPickedIdea || size(row.pickedUsers) > 0){
                return data;
            }
        });

        setFormattedIdeas(compact(data));
    }, [ideas, onlyShowPickedIdea]);

    const searchForIdeas = async (searchingText) => {
        let ideas = [];
        switch(searchingType){
            case 'phoneNumber':
                ideas = await getIdeasByOwnerPhonenumber(searchingText);
                setUsers(users);
                break;
            case 'nickName':
                ideas = await getIdeasByOwnerNickname(searchingText);
                break;
        }
        setIdeas(ideas);
    };

    const currentlySelected = (params, e) => {
        const {id, value, field} = params;
        if(field==='isAvailable'){
            e.preventDefault();
            e.stopPropagation();
            const idea = find(formattedIdeas, idea => idea.id == id);
            idea.isAvailable = !value;
    
            setIdeaVisibility({ideaId: id, isAvailable: !value});
        }
    }

    return (
        <Layout>
            <div style={{display: 'flex', flexDirection: 'column', padding: 20, flex: 1}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span style={{fontSize: 26, fontWeight: 'bold'}}>아이디어 리스트</span>
                        <IconButton onClick={() => getIdeas().then(setIdeas)}>
                            <Refresh />
                        </IconButton>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <FormControlLabel
                            checked={onlyShowPickedIdea}
                            value="start"
                            control={<Switch color="primary" />}
                            label="pick된 회원만 보기"
                            labelPlacement="start"
                            style={{marginRight: 16}}
                            onChange={e=>setOnlyShowPickedIdea(e.target.checked)}
                        />
                        <CBSelect containerStyle={{marginRight: 8}} onValueChange={setSearchingType}/>
                        <SearchInput onSearch={searchForIdeas}/>
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
                        onCellClick={currentlySelected}
                    />
                </div>
            </div>
            <IdeaDetailDialog {...{open, setOpen}} data={selectedRow}/>
        </Layout>
    )
}