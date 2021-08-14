import React from 'react';
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { map } from 'lodash';
import { Close, ArrowBackIos } from '@material-ui/icons';
import { IconButton, DialogTitle } from '@material-ui/core';

import UserProfileTableCell from '../components/UserProfileTableCell';
import UserProfileDialog from './UserProfileDialog';

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });

const PickedUsersDialog = ({users, open, setOpen}) => {
    const classes = useStyles();

    const [ openUserProfile, setOpenUserProfile ] = useState(false);

    return (
        <Dialog maxWidth='lg' open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton onClick={() => setOpen(false)}>
                        <ArrowBackIos />
                    </IconButton>
                    <span>PICK</span>
                </div>
            </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            {
                                map( users, user => (
                                    <TableRow>
                                        <TableCell component="th" scope="row" style={{verticalAlign: 'top'}}>
                                            <UserProfileTableCell user={user}/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <a
                                                style={{padding: 8, backgroundColor: '#1379FF', color: 'white', cursor:'pointer'}}
                                                onClick={() => setOpenUserProfile(true)}
                                            >
                                                프로필 상세
                                            </a>
                                        </TableCell>
                                    </TableRow>
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
                openUserProfile &&
                <UserProfileDialog open={openUserProfile} setOpen={setOpenUserProfile} />
            }
        </Dialog>
    )
}

export default PickedUsersDialog;
