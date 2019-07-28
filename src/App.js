import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom';
import Login from "./routers/login/Login";
import Admin from "./routers/admin/Admin";

export default class App extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Admin}/>
                </Switch>
            </HashRouter>
        );
    }

}