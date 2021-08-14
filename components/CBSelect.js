import { useState, useEffect } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import { ArrowDownward, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const Select = withStyles(theme => ({
    select: {
        padding: '0 8px',
        border: '1px solid #E5E5E5',
        margin: 0,
        '&:focus': {
            backgroundColor: "white",
        },
        "&:not([multiple]) option": {
            padding: "8px 0"
        }
    },
    root: {
        height: 40,
    },
    underline: {
        borderBottom: 'none',
        '&:after': {
            borderBottom: "none",
        }
    }
}))(NativeSelect);

const CBSelect = ({onValueChange, containerStyle}) => {
    const classes = useStyles();

    const [ value, setValue ] = useState('nickName')
;
    const handleChange = (event) => setValue(event.target.value);

    useEffect(() => {
        (typeof onValueChange === 'function') && onValueChange(value);
    }, [value]);

    return (
        <Select
          value={value}
          onChange={handleChange}
          IconComponent={ExpandMore}
          className={classes.selectEmpty}
          style={{marginTop: 0, ...containerStyle}}
        >
          <option style={{padding: 8, minHeight: 20}} value="nickName">닉네임</option>
          <option value="phoneNumber">휴대폰 번호</option>
        </Select>
    )
}

export default CBSelect;