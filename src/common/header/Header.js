import React, {Component, Fragment} from 'react';
import './Header.css';  //CSS file for header styles
import {Avatar, Divider, IconButton, Input, InputAdornment, Menu, MenuItem, Typography} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {Redirect} from 'react-router-dom';
import profilePicture from '../../assets/tejas.jpeg';

/* Reusable header component */
class Header extends Component {

    constructor() {
        super();
        this.state = {
            loggedOut: false,
            menuState: false,
            anchorEl: null,
        }
    }

    render() {
        if (this.state.loggedOut === true) {
            return <Redirect to='/'/>
        }
        return <div className='header-flex-container'>
            {
                this.props.isLoggedIn !== true ?
                    <div>
                            <header className='logo'>Image Viewer</header>
                    </div>
                    :
                    <Fragment>
                        <div onClick={() => this.onLogoClick()}>
                                <header className='logo'>Image Viewer</header>
                        </div>
                        <div className='header-right-flex-container'>
                            {
                                this.props.showSearchBox ?
                                    <Input className='search-box' type='search' placeholder='Search...' disableUnderline
                                           startAdornment={
                                               <InputAdornment position="start"><SearchIcon/></InputAdornment>
                                           } onChange={this.props.onSearch}/>
                                    :
                                    null
                            }
                            <IconButton id='profile-icon' onClick={this.onProfileIconClick}>
                                <Avatar alt="Tejas Hegde" src={profilePicture} />
                            </IconButton>
                            <div>
                                <Menu open={this.state.menuState} onClose={this.onMenuClose}
                                      anchorEl={this.state.anchorEl} getContentAnchorEl={null}
                                      anchorOrigin={{vertical: "bottom", horizontal: "right"}} keepMounted>
                                    {
                                        this.props.showMyAccount ?
                                            <MenuItem onClick={this.onMyAccount}><Typography>My
                                                Account</Typography></MenuItem> : null
                                    }
                                    {
                                        this.props.showMyAccount ?
                                            <Divider variant="middle"/> : null
                                    }
                                    <MenuItem onClick={this.onLogout}><Typography>Logout</Typography></MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </Fragment>
            }
        </div>
    }

    /*
        Function to navigaate to home on logo click
    */

    onLogoClick = () => {
        this.props.history.push({
                pathname: '/home',
                state:
                    {
                        loginSuccess: true
                    }
            }
        )
        ;
    }
    /*
        Function to navigaate to profile on My Account click
    */
    onMyAccount = () => {
        this.props.onIsProfileClicked();

    }
    /*
        Function to logout and redirect to login page
    */
    onLogout = () => {
        sessionStorage.removeItem('access-token');
        this.setState({loggedOut: true})
    }

    /*
        Function to handle on Profile icon click
    */
    onProfileIconClick = (e) => {
        this.setState({'menuState': !this.state.menuState, 'anchorEl': e.currentTarget});
    }

    /*
        Function to handle Menu Close Functionality
    */
    onMenuClose = () => {
        this.setState({'menuState': !this.state.menuState, 'anchorEl': null});
    }
}

export default Header;