import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../../screens/Home/Home";
import App from "../../App";
import Login from "../../screens/Login/Login";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact  component={App} />
                    <Route path="/Home" component={Home} />
                </Switch>
            </Router>
        )
    }
}