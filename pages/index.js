import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles, CircularProgress } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { size } from 'lodash';
import { checkAvailablePhoneNumberForLogin } from '../firebase/users';
import firebase from '../firebase/init';


import styles from '../styles/Home.module.css';
import { useAuth } from '../firebase/authContext';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const LoginTextInput = withStyles(theme => ({
    input: {
        padding: 8,
        border: '1px solid #9B9B9B',
        borderRadius: 4
    }
}))(InputBase);

export default function Login(){
    const router = useRouter();
    const classes = useStyles();

    const [ allowedPhonenumbers, setAllowedPhonenumber ] = useState([]);
    const [ step, setStep ] = useState(1);
    const [ phoneNumber, setPhoneNumber ] = useState();
    const [ verificationCode, setVerificationCode ] = useState();
    const [confirmation, setConfirmation] = useState();
    const [loading, setLoading] = useState(false);


    const { authLoading, authUser } = useAuth();

    useEffect(() => {
        getAvailablePhonenumbers();
    }, []);

    useEffect(() => {
        if(authUser){
            router.replace('/users');
        }
    }, [authUser]);

    const getAvailablePhonenumbers = async() => {
        const phoneNumbers = await checkAvailablePhoneNumberForLogin();
        setAllowedPhonenumber(phoneNumbers);
    };

    const signInWithPhoneNumber = (phoneNumber) => {
        if(!phoneNumber) return;
        try{
            setLoading(true);

            const number = phoneNumber.replace('0', '+82');
            console.log(number);
            const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                // 'size': 'invisible',
                'size': 'normal',
                'callback': async (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    try{
                        const confirmation = await firebase.auth().signInWithPhoneNumber(number, recaptchaVerifier);
                        setConfirmation(confirmation);
                        setLoading(false);
                        setStep(2);
                    }catch(ex){
                        console.log(ex);
                        alert(`something's wrong`);
                    }
                },
                'expired-callback': function() {
                    console.log("expired-callback");
                    setLoading(false);
                    alert(`something's wrong`);
                }
            });
            recaptchaVerifier.render().then(function(widgetId) {
            });
        }catch(e){
            console.log('signInWithPhoneNumber', e);
        }
    }

    const confirmVerificationCode = async (verificationCode) => {
        if(!confirmation || !verificationCode) return;

        try{
            const {user} = await confirmation.confirm(verificationCode);
            console.log('user', user);

            return true;
        }catch(ex){
            console.log('confirmCode', ex);
        }
        return false;
    };

    const onLogin = async () => {
        if(step===1){
            if(allowedPhonenumbers.includes(phoneNumber)){
                signInWithPhoneNumber(phoneNumber);
            }else{
                alert('phone number is not allowed to login');
                return;
            }
        }else{
            setLoading(true);
            const ret = await confirmVerificationCode(verificationCode);
            setLoading(false);
            if(ret){
                router.replace('/users');
            }else{
                alert('something`s wrong');
                return;
            }
        }
    };

    return(
        <div className='container'>
        {
            authLoading ?
            <CircularProgress size={48} color='primary' />
            :
            <Card className={classes.root}>
                    <CardContent>
                        <div style={{textAlign: 'center'}}>
                            <span style={{fontSize: 25}}>
                                <span style={{color: '#009DFF', fontWeight: 'bold'}}>케어박스</span> 로그인
                            </span>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 32}}>
                            <span style={{color: '#4F4F4F', fontSize: 16, marginRight: 24}}>
                                전화번호
                            </span>
                            <LoginTextInput
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                type='number'
                            />
                        </div>

                        {
                            step === 1 &&
                            <div id="recaptcha-container" style={{marginTop: 16}}></div>
                        }

                        {
                            step===2 &&
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16}}>
                                <span style={{color: '#4F4F4F', fontSize: 16}}>
                                    인증번호
                                </span>
                                <LoginTextInput
                                    value={verificationCode}
                                    onChange={e => setVerificationCode(e.target.value)}
                                    type='number'
                                />
                            </div>
                        }
                        <Button
                            style={{width: '100%', marginTop: 32}}
                            variant='contained'
                            color='primary'
                            onClick={onLogin}
                            disabled={(step==1&&size(phoneNumber)!==11) || loading}
                        >
                            {
                                loading ?
                                <CircularProgress size={24} color='primary'/>
                                :
                                (step===1 ? '확인' : '로그인')
                            }
                        </Button>
                    </CardContent>
                </Card>
            }
        </div>
    )
}