import React, { useEffect } from 'react';
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { map } from 'lodash';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import CommentRepliesDialog from './CommentRepliesDialog';
import UserProfileTableCell from '../components/UserProfileTableCell';
import { getCommentReplies, setIdeaCommentVisibility } from '../firebase/ideas';
import { IconButton, CircularProgress } from '@material-ui/core';

const Comment = ({comment, onOpenReplies}) => {
    const [ replies, setReplies ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const [ isAvailable, setAvailable ] = useState();

    const setVisibility = async () => {
        setLoading(true);
        const ret = await setIdeaCommentVisibility({
            ideaId: comment.ideaId,
            commentId: comment.id,
            isAvailable: !isAvailable
        });
        setAvailable(!isAvailable);
        setLoading(false);
    };

    useEffect(() => {
        if(comment){
            getCommentReplies({ideaId: comment.ideaId, commentId: comment.id}).then(setReplies);
            setAvailable(comment.isAvailable);
        }
    });

    return (<TableRow>
        <TableCell component="th" scope="row" style={{verticalAlign: 'top'}}>
            <UserProfileTableCell user={comment.owner}/>
        </TableCell>
        <TableCell align="left" style={{verticalAlign: 'top'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span><span style={{fontWeight: 'bold', fontSize: 15}}>종합평점</span> <span style={{fontWeight: 'bold', color: '#1379FF'}}>4.0점</span></span>
                <span><span>실용성</span> <span style={{color: '#898989'}}>{comment.practicalityRate}</span></span>
                <span><span>창의성</span> <span style={{color: '#898989'}}>{comment.creativityRate}</span></span>
                <span><span>가치성</span> <span style={{color: '#898989'}}>{comment.valuableRate}</span></span>
            </div>
        </TableCell>
        <TableCell align="left" style={{verticalAlign: 'top'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>{comment.scamper}</span>
            </div>
        </TableCell>
        <TableCell align="left"  style={{maxWidth: 200, verticalAlign: 'top'}}>
            <span>
                {comment.content}
            </span>
        </TableCell>
        <TableCell align="left" style={{verticalAlign: 'top'}}>
            <a
                style={{padding: 8, backgroundColor: '#1379FF', color: 'white', cursor:'pointer'}}
                onClick={() => replies.length && onOpenReplies(replies)}
            >
                댓글 {replies.length}개 보기 
            </a>
        </TableCell>
        <TableCell>
            {
                loading ? <CircularProgress size={24} color='primary' />
                :
                <IconButton onClick={setVisibility}>
                    {
                        isAvailable ? <VisibilityIcon /> : <VisibilityOffIcon />
                    }
                </IconButton>
            }
        </TableCell>
    </TableRow>)
}

const useStyles = makeStyles({
    table: {
      minWidth: 800,
    },
});

const CommentsDialog = ({open, setOpen, comments}) => {
    const classes = useStyles();

    const [ openRepliesDialog, setOpenRepliesDialog ] = useState(false);
    const [ currentReplies, setCurrentReplies ] = useState();

    return (
        <Dialog maxWidth='lg' open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">등록된 코멘트</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>회원정보</TableCell>
                                <TableCell align="left">평점</TableCell>
                                <TableCell align="left">scamper기법</TableCell>
                                <TableCell align="left">코멘트</TableCell>
                                <TableCell align="left">댓글</TableCell>
                                <TableCell align="left">공개</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                map(comments, comment => (
                                    <Comment
                                        comment={comment}
                                        onOpenReplies={(replies) => {
                                            setOpenRepliesDialog(true);
                                            setCurrentReplies(replies);
                                        }}
                                    />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={() => setOpen(false)} variant='outlined'>
                    취소
                </Button> */}
                <Button onClick={() => setOpen(false)} variant='contained' color="primary">
                    확인
                </Button>
            </DialogActions>
            {
                openRepliesDialog &&
                <CommentRepliesDialog
                    open={openRepliesDialog}
                    setOpen={setOpenRepliesDialog}
                    replies={currentReplies}
                />
            }
        </Dialog>
    )
}

export default CommentsDialog;
