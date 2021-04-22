import {React} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Header.css';

const Header=()=>{
    const styles={
        backgroundColor: '#263238'
    }

    return(
        <div>
            <AppBar position="static" className='header' style={styles}>
                    <Toolbar>
                        <Typography variant="h6" className='logo'>
                        Image Viewer
                        </Typography>
                    </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;