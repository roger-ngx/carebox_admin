import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { Search } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const TextInput = withStyles(theme => ({
    input: {
        padding: '0 8px',
        border: '1px solid #E5E5E5',
        borderRightWidth: 0,
        height: 40,
        width: 250
    }
}))(InputBase);

const SearchButton = withStyles(theme => ({
    root: {
        padding: 8,
        borderRadius: 0,
        backgroundColor: '#009DFF'
    }
}))(IconButton);

const SearchInput = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput placeholder='검색어 입력' />
            <SearchButton>
                <Search style={{color:'white'}}/>
            </SearchButton>
        </div>
    )
}

export default SearchInput;