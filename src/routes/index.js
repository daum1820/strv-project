import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { history, store } from '../lib/config';
import Auth from '../containers/commons/Auth';
import Register from '../containers/commons/Register';
import Home from '../containers/commons/Home';
import User from '../containers/user/User';
import EventForm from '../containers/events/EventForm';
import Main from '../components/Main';
import NotFound from '../components/NotFound';
import { checkAlreadyLoggedIn, checkAuth } from './callbacks.js';
import { onHomeEnter, onUserEnter, onEventEnter, onNewEventEnter} from './callbacks.js';

export default (
    <Router history={history}>
        <Route path="/login" component={Auth} onEnter={checkAlreadyLoggedIn}/>
        <Route path="/register" component={Register}/>
        <Route path="/" component={Main} onEnter={checkAuth}>
            <IndexRoute component={Home} onEnter={onHomeEnter}/>
            <Route path="/events/:id" component={EventForm} onEnter={onEventEnter} />
            <Route path="/event/new" component={EventForm} onEnter={onNewEventEnter} />
            <Route path="/user/profile" component={User} onEnter={onUserEnter}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);