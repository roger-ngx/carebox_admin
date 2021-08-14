import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { Rating } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { join, throttle, size, reduce } from 'lodash';

import { ArrowForwardIos, Category, Star } from '@material-ui/icons';
import CommentsDialog from './CommentsDialog';
import { IconButton, CircularProgress } from '@material-ui/core';
import PickedUsersDialog from './PickedUsersDialog';
import { getIdeaComments } from '../firebase/ideas';
import { changeUserGrade, getUserById } from '../firebase/users';


const Item = ({leftText, rightText}) => (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '12px 0'}}>
        <span style={{width: 120, textAlign: 'right', color: '#878787'}}>{leftText}</span>
        <span style={{color: '#C4C4C4', margin: '0 8px'}}>|</span>
        <span style={{flex: 1, color: '#323030'}}>{rightText}</span>
    </div>
)

const IdeaDetailDialog = ({data, open, setOpen}) => {
    if(!data) return null;

    console.log(data);

    const { id, owner, nickName, subject, category, scampers, detail, rating, pickedUsers } = data;

    const [ showingCommentList, setShowingCommentList ] = useState(false);
    const [ openPickedUsers, setOpenPickedUsers ] = useState(false);
    const [ comments, setComments ] = useState([]);

    const [ userGrade, setUserGrade ] = useState();
    const [ ideaOwner, setIdeaOwner ] = useState({});

    const [ loading, setLoading ] = useState(false);

    const [ overallRating, setOverallRate ] = useState({})

    useEffect(() => {
        if(id){
            getIdeaComments(id).then(setComments);
            setUserGrade(owner.grade);
        }
    }, [id]);

    useEffect(() => {
        if(owner.uid){
            loadIdeaOwner(owner.uid);
        }
    }, [owner]);

    useEffect(() => {
        const ratingSize = size(rating);
        if(ratingSize > 0){

            const overallRate = reduce(rating, (sum, rate) => {
                sum.avg = sum.avg + rate.avgRating;
                sum.creativity += rate.creativityRate;
                sum.practicality += rate.practicalityRate;
                sum.valuable += rate.valuableRate;

                return sum;
            }, {avg: 0, creativity: 0, practicality: 0, valuable: 0});


            return setOverallRate({
                avg: +(overallRate.avg/ratingSize).toFixed(1),
                creativity: +(overallRate.creativity/ratingSize).toFixed(1),
                practicality: +(overallRate.practicality/ratingSize).toFixed(1),
                valuable: +(overallRate.valuable/ratingSize).toFixed(1)
            })
        }

        return setOverallRate({avg: 0, creativity: 0, practicality: 0, valuable: 0});

    }, [rating]);

    const loadIdeaOwner = async (uid) => {
        const user = await getUserById(uid);
        setIdeaOwner(user);
        setUserGrade(user.grade);
    }

    const changeGrade = async () => {
        setLoading(true);
        try{
            await changeUserGrade(owner.uid, userGrade===1?2:1)
            setUserGrade(userGrade===1?2:1);
        }catch(ex){
            console.log('changeGrade', ex);
        }
        setLoading(false);
    }

    return (
        <>
        <Dialog maxWidth='lg' open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">등록된 코멘트</DialogTitle>
            <DialogContent>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1, marginRight: 20}}>
                        <div style={{display: 'flex', flexDirection: 'row', paddingBottom: 20}}>
                            <div style={{width: 68, height: 68}}>
                                <img src={ideaOwner.profileImageUrl || '/assets/icons/ic_profile.png'} width={68} height={68} alt=''/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 16}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <span style={{fontSize: 20, fontWeight: 'bold', marginRight: 8}}>{nickName}</span>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <span>{ideaOwner.gender==='M' ? '남' : '여'}/ {ideaOwner.yearsOnJob}년차 / {ideaOwner.department}</span>
                                        <span style={{color: '#797979'}}>{ideaOwner.phoneNumber}</span>
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
                                        <span>{userGrade === 1 ? '새싹' : '왕관'}</span>
                                    </div>
                                    <div
                                        style={{cursor: 'pointer', backgroundColor: '#1379FF', padding: 4, width: 80, textAlign: 'center'}}
                                        onClick={throttle(changeGrade, 3000, {trailing: false})}
                                    >
                                        {
                                            loading ?
                                            <CircularProgress size={12} style={{color:'#fff'}} />
                                            :
                                            <span style={{color: 'white'}}>{userGrade === 1 ? '등급 up' : '등급 down'}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1, borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#BEBEBE', padding: '20px 0'}}>
                            <Item
                                leftText='카테고리'
                                rightText={category}
                            />
                            <Item
                                leftText='아이디어 종류'
                                rightText='이미 있던것의 발전'
                            />
                            <Item
                                leftText='스캠퍼'
                                rightText={scampers}
                            />
                            <Divider />
                            <Item
                                leftText='제목'
                                rightText={subject}
                            />
                            <Divider />
                            <Item
                                leftText='구체적 대상'
                                rightText={detail.object}
                            />
                            <Item
                                leftText='구체적 상황'
                                rightText={detail.situation}
                            />
                            <Item
                                leftText='해결 방법'
                                rightText={join(detail.solution, '\n')}
                            />
                            <Divider />
    
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#EEF6FF', width: 300, padding: 20}}>
                        <div style={{marginBottom: 48}}>
                            <span style={{display: 'flex', fontWeight: 'bold', fontSize: 15, alignItems: 'center'}}>총<Star style={{color: '#FFC700', marginLeft: 8}} /> {overallRating.avg}</span>
                            <Divider style={{margin: '8px 0'}}/>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <span>실용성</span>
                                    <Rating
                                        // disabled={true}
                                        readOnly={true}
                                        value={overallRating.practicality}
                                        style={{margin: '0 8px'}}
                                    />
                                    <span>{overallRating.practicality}</span>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                                    <span>창의성</span>
                                    <Rating
                                        // disabled={true}
                                        readOnly={true}
                                        value={overallRating.creativity}
                                        style={{margin: '0 8px'}}
                                    />
                                    <span>{overallRating.creativity}</span>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                                    <span>가치성</span>
                                    <Rating
                                        // disabled={true}
                                        readOnly={true}
                                        value={overallRating.valuable}
                                        style={{margin: '0 8px'}}
                                    />
                                    <span>{overallRating.valuable}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{marginBottom: 48}}>
                            <span style={{fontWeight: 'bold', fontSize: 15}}>등록된 코멘트</span>
                            <Divider style={{margin: '8px 0'}}/>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>{comments.length}개</span>
                                <IconButton onClick={() => setShowingCommentList(true)}>
                                    <ArrowForwardIos color='#686868' style={{fontSize:16}}/>
                                </IconButton>
                            </div>
                        </div>
    
                        <div>
                            <span style={{fontWeight: 'bold', fontSize: 15}}>PICK</span>
                            <Divider style={{margin: '8px 0'}}/>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>{size(pickedUsers)}명</span>
                                <IconButton disabled={size(pickedUsers)===0} onClick={() => setOpenPickedUsers(true)}>
                                    <ArrowForwardIos color='#686868' style={{fontSize:16}}/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
                
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={() => setOpen(false)} variant='outlined'>
                    취소
                </Button> */}
                <Button onClick={() => setOpen(false)} variant='contained' color="primary">
                    확인
                </Button>
            </DialogActions>
        </Dialog>
        {
            showingCommentList &&
            <CommentsDialog open={showingCommentList} setOpen={setShowingCommentList} comments={comments}/>
        }
        {
            openPickedUsers &&
            <PickedUsersDialog users={pickedUsers} open={openPickedUsers} setOpen={setOpenPickedUsers} />
        }
        </>
    )
}

export default IdeaDetailDialog;