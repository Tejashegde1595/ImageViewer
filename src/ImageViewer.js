import React, {Component, Fragment} from 'react'
import {Route, Switch} from "react-router-dom"; // For redirection
import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
//import Profile from "./screens/profile/Profile";

/**
 * This class is built entire Application.
 */
class ImageViewer extends Component {
    render() {
        return <Fragment>
            <Switch>
                <Route exact path='/' render={(props) => <Login {...props}/>}/>
                <Route exact path='/home' render={(props) => <Home {...props}/>}/>
               
            </Switch>
        </Fragment>
    }
}

export default ImageViewer;