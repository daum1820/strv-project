import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { history, store } from '../lib/config';
import Auth from '../containers/Auth';
import Home from '../containers/Home';
import EventList from '../containers/EventList';
import NotFound from '../components/NotFound';
import { checkAlreadyLoggedIn, onHomeEnter} from './callbacks.js';

export default (
    <Router history={history}>
        <Route path="/login" component={Auth} onEnter={checkAlreadyLoggedIn}/>
        <Route path="/" component={Home} onEnter={onHomeEnter}>
            <IndexRoute component={EventList}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);