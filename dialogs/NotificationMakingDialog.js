import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { DataGrid } from '@material-ui/data-grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { underline } from 'colorette';

const Input = withStyles(theme => ({
    root: {
        '& .MuiInput-underline:before': {
            borderBottomWidth: 0,
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomWidth: 0,
        },
        '& .MuiInput-underline:after': {
            borderBottomWidth: 0,
        }
    }
}))(TextField);

const NotificationMakingDialog = ({open, setOpen}) => {

    return (
        <Dialog maxWidth='lg' open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">공지 등록</DialogTitle>
            <DialogContent>
                <Input
                    style={{
                        width: 300,
                        border: '1px solid #B2B2B2',
                        borderRadius: 8,
                        padding: '0 8px'
                    }}
                    rows={5}
                    multiline
                />
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
    )
}

export default NotificationMakingDialog;