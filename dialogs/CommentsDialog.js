import React from 'react';
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

import CommentRepliesDialog from './CommentRepliesDialog';
import UserProfileTableCell from '../components/UserProfileTableCell';

const Item = ({leftText, rightText}) => (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '12px 0'}}>
        <span style={{width: 120, textAlign: 'right', color: '#878787'}}>{leftText}</span>
        <span style={{color: '#C4C4C4', margin: '0 8px'}}>|</span>
        <span style={{color: '#323030'}}>{rightText}</span>
    </div>
)

const useStyles = makeStyles({
    table: {
      minWidth: 800,
    },
  });

const CommentsDialog = ({open, setOpen}) => {
    const classes = useStyles();

    const [ openRepliesDialog, setOpenRepliesDialog ] = useState(false);

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
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{verticalAlign: 'top'}}>
                                    <UserProfileTableCell />
                                </TableCell>
                                <TableCell align="left" style={{verticalAlign: 'top'}}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <span><span style={{fontWeight: 'bold', fontSize: 15}}>종합평점</span> <span style={{fontWeight: 'bold', color: '#1379FF'}}>4.0점</span></span>
                                        <span><span>실용성</span> <span style={{color: '#898989'}}>5</span></span>
                                        <span><span>창의성</span> <span style={{color: '#898989'}}>3</span></span>
                                        <span><span>가치성</span> <span style={{color: '#898989'}}>4</span></span>
                                    </div>
                                </TableCell>
                                <TableCell align="left" style={{verticalAlign: 'top'}}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <span>P 용도의 전환</span>
                                        <span>R 역발상</span>
                                    </div>
                                </TableCell>
                                <TableCell align="left"  style={{maxWidth: 200, verticalAlign: 'top'}}>
                                    <span>
                                        산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격...
                                    </span>
                                </TableCell>
                                <TableCell align="left" style={{verticalAlign: 'top'}}>
                                    <a
                                        style={{padding: 8, backgroundColor: '#1379FF', color: 'white', cursor:'pointer'}}
                                        onClick={() => setOpenRepliesDialog(true)}
                                    >
                                        댓글 1개 보기 
                                    </a>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant='outlined'>
                    취소
                </Button>
                <Button onClick={() => setOpen(false)} variant='contained' color="primary">
                    확인
                </Button>
            </DialogActions>
            {
                openRepliesDialog &&
                <CommentRepliesDialog
                    open={openRepliesDialog}
                    setOpen={setOpenRepliesDialog}
                />
            }
        </Dialog>
    )
}

export default CommentsDialog;
