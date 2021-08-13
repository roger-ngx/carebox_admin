import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TextField, CircularProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { addNotification } from '../firebase/notifications';
import { isEmpty, trim } from 'lodash';
import moment from 'moment';

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

const NotificationMakingDialog = ({open, setOpen, onSuccess}) => {

    const [ notificationContent, setNotificationContent ] = useState();
    const [ processing, setProcessing ] = useState(false);

    const addNewNotification = async () => {
        setProcessing(true);
        try{
            const data = await addNotification(notificationContent);
            data.registrationDate = moment().format('YYYY.MM.DD HH:mm').toString();
            console.log('addNewNotification', data);

            onSuccess && onSuccess(data);
            setOpen(false);
        }catch(ex){
            console.log(ex);
            alert('error. plz try again');
        }
        setProcessing(false);
    };

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
                    value={notificationContent}
                    onChange={e => setNotificationContent(trim(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpen(false)}
                    variant='outlined'
                    disabled={processing}
                >
                    취소
                </Button>
                <Button
                    onClick={addNewNotification}
                    variant='contained'
                    color="primary"
                    disabled={isEmpty(notificationContent) || processing}
                >
                    {
                        processing ?
                        <CircularProgress size={24} style={{color:'white'}} />
                        :
                        '확인'
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NotificationMakingDialog;