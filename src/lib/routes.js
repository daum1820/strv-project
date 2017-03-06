import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { history, store } from '../lib/config';
import Login from '../components/Login';
import Home from '../components/Home';

export const checkAuth = (nextState, replaceState) => {
    const { loggedIn } = store.getState().auth;
    if (!loggedIn) {
        replaceState('/login');
    }
}

export const checkAlreadyLoggedIn = (nextState, replaceState) => {
    const { loggedIn } = store.getState().auth;
    if (loggedIn) {
        replaceState('/');
    }
}

export default (
    <Router history={history}>
        <Route path="/login" component={Login} onEnter={checkAlreadyLoggedIn}/>
        <Route path="/" component={Home} onEnter={checkAuth}/>
    </Router>
);