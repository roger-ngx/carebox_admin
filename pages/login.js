import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

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
    const classes = useStyles();

    return(
        <div className='container'>
            <Card className={classes.root}>
                <CardContent>
                    <div style={{textAlign: 'center'}}>
                        <span style={{fontSize: 25}}>
                            <span style={{color: '#009DFF', fontWeight: 'bold'}}>케어박스</span> 로그인
                        </span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 32}}>
                        <span style={{color: '#4F4F4F', fontSize: 16, marginRight: 24}}>
                            아이디
                        </span>
                        <LoginTextInput />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, marginBottom: 32}}>
                        <span style={{color: '#4F4F4F', fontSize: 16}}>
                            비밀번호
                        </span>
                        <LoginTextInput />
                    </div>
                    <Button style={{width: '100%'}} variant='contained' color='primary'>로그인</Button>
                </CardContent>
            </Card>
        </div>
    )
}