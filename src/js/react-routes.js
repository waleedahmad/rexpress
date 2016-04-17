import React from 'react';
import Auth from './auth';
import {Router,Route,Link,browserHistory,IndexRoute,useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={require('./components/app')}>
            <IndexRoute component={require('./components/dashboard/index')} onEnter={Auth.isAuthenticated}/>

            <Route path="/register"
                   component={require('./components/authentication/register')}
                   onEnter={Auth.isNotAuthenticated} />

            <Route path="/login"
                   component={require('./components/authentication/login')}
                   onEnter={Auth.isNotAuthenticated}/>

            <Route path="*"
                   component={require('./components/404/404')}/>
        </Route>
    </Router>
);

module.exports = routes;