import React from 'react';
import { useState } from 'react';
import Image from 'next/image'
import { DataGrid } from '@material-ui/data-grid';
import { Rating } from '@material-ui/lab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { map } from 'lodash';

import { Close } from '@material-ui/icons';
import UserProfileTableCell from '../components/UserProfileTableCell';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });

const CommentRepliesDialog = ({replies, open, setOpen}) => {
    const classes = useStyles();

    return (
        <Dialog maxWidth='lg' open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton onClick={() => setOpen(false)}>
                        <Close />
                    </IconButton>
                    <span>등록된 코멘트</span>
                </div>
            </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>회원정보</TableCell>
                                <TableCell align="left">댓글 내용</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            map(replies, reply => (
                                <TableRow>
                                    <TableCell component="th" scope="row" style={{verticalAlign: 'top'}}>
                                        <UserProfileTableCell user={reply.owner}/>
                                    </TableCell>
                                    <TableCell align="left" style={{verticalAlign: 'top'}}>
                                        <span>{reply.reply}</span>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    )
}

export default CommentRepliesDialog;
