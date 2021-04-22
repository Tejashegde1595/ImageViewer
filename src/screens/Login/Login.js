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


import './Login.css';


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


class Login extends Component{
    constructor(){
        super();
        this.state={
            userNameRequired:'dispNone',
            passwordRequired:'dispNone',
            passwordAndUsernameRequired:'dispNone',
            username:'',
            password:''
        }
    }

    inputUserNameChangeHandler=(e)=>{
        this.setState({username:e.target.value})
    }

    inputPasswordChangeHandler=(e)=>{
        this.setState({password:e.target.value})
    }

    loginClickHandler=()=>{
        if(this.state.username==='' || this.state.password===''){
            this.state.username===''?this.setState({userNameRequired:'dispBlock'}):
            this.setState({userNameRequired:'dispNone'})
            this.state.password===''?this.setState({passwordRequired:'dispBlock'}):
            this.setState({passwordRequired:'dispNone'})
            this.setState({passwordAndUsernameRequired:'dispNone'})
            return;
        }else{
            if(this.state.username==='Username' && this.state.password==='Password'){
                history.push("/Home");
            }else{
                this.setState({passwordAndUsernameRequired:'dispBlock',userNameRequired:'dispNone',passwordRequired:'dispNone'});
            }
        }
    }

    render(){
        return(
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

        
        )
    }
}

export default Login;