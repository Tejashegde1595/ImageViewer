import React,{ Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import history from '../../common/Routes/history';
import {Redirect} from 'react-router-dom';

import './Login.css';
import Header from '../../common/header/Header';


const TabContainer=(props)=>{
    return(
        <Typography component="div" style={{padding:'5px',textAlign:'center'}}>
            {props.children}
        </Typography>
    )
}
TabContainer.protoTypes = {
    children:PropTypes.node.isRequired
}

const userDetails = {
    username: 'Username',
    password: 'Password',
    accessToken: 'IGQVJWWWFwMV9JY3FWY1AxYXZAUY3J6UEdIVXUwNGFxQUlTZA0VLQ3NtbVBVYUw1LUQ3ZA3ZAaMmRRVDdycnZAkTjVFRDlsZAm9id2ZA1RXlOMEVFdXNUQ1hQV0FYcWxPbkRHeS16aEFuUndISlpoN09IbkU0aQZDZD'
};

class Login extends Component{
    constructor(){
        super();
        this.state={
            userNameRequired:'dispNone',
            passwordRequired:'dispNone',
            passwordAndUsernameRequired:'dispNone',
            username:'',
            password:'',
            loginSuccess: false
        }
    }
    /*
        Function to handler change in Input for Username
    */
    inputUserNameChangeHandler=(e)=>{
        this.setState({username:e.target.value})
    }

    /*
        Function to handler change in Input for Password
    */

    inputPasswordChangeHandler=(e)=>{
        this.setState({password:e.target.value})
    }

    /*
        Function to handler changes after clicking the Login button
    */

    loginClickHandler=()=>{
        if(this.state.username==='' || this.state.password===''){
            this.state.username===''?this.setState({userNameRequired:'dispBlock'}):
            this.setState({userNameRequired:'dispNone'})
            this.state.password===''?this.setState({passwordRequired:'dispBlock'}):
            this.setState({passwordRequired:'dispNone'})
            this.setState({passwordAndUsernameRequired:'dispNone'})
            return;
        }else{
            if(this.state.username===userDetails.username && this.state.password===userDetails.password){
                this.setState({incorrectCredentialHelperTextDisplay: 'display-none', loginSuccess: true});
                sessionStorage.setItem("access-token", userDetails.accessToken);
                history.push()
            }else{
                this.setState({passwordAndUsernameRequired:'dispBlock',userNameRequired:'dispNone',passwordRequired:'dispNone'});
            }
        }
    }
    /*
    Function to render the page
    */
    render(){
        if (this.state.loginSuccess === true) {
            return <Redirect to={{pathname: '/home', state: {loginSuccess: true}}}/>
        }
        return(
        <div>
        <Header/>
        <Card className='loginForm' variant="outlined">
            <CardContent>
              <CardHeader title='LOGIN' className='loginHeader'></CardHeader>
                <FormControl className='loginContent' required>
                      <InputLabel htmlFor='userName'>Username</InputLabel>
                      <Input id='username' type='text' username={this.state.username} onChange={this.inputUserNameChangeHandler} ></Input>
                      <FormHelperText className={this.state.userNameRequired}><span className='red'>required</span></FormHelperText>
                  </FormControl>
                  <br/>
                  <FormControl className='loginContent' required>
                      <InputLabel htmlFor='password'>Password</InputLabel>
                      <Input id='password' type='password'  password={this.state.password} onChange={this.inputPasswordChangeHandler}></Input>
                      <FormHelperText className={this.state.passwordRequired}><span className='red'>required</span></FormHelperText>
                  </FormControl>
                  <FormHelperText className={this.state.passwordAndUsernameRequired}><span className='red'>Incorrect username and/or password</span></FormHelperText>
            </CardContent>
            <CardActions>
              <Button variant='contained' color='primary' onClick={this.loginClickHandler}>Login</Button>
            </CardActions>
        </Card>
        </div>
        
        )
    }
}

export default Login;