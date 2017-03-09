import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import axios from 'axios';
import { syncHistoryWithStore, routerMiddleware, routerReducer as RouterReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import promiseMiddleware from 'redux-promise-middleware';
import { doLogout } from '../actions/authActions';
import { hashHistory } from 'react-router';
import AuthReducer from '../reducers/authReducer';
import EventsReducer from '../reducers/eventsReducer';
import { ROOT_URL } from '../utils';

const reducers = combineReducers({
    auth: AuthReducer,
    form : FormReducer,
    routing: RouterReducer,
    events :  EventsReducer
});

const middleware = applyMiddleware(
    thunk,
    promiseMiddleware(),
    routerMiddleware(hashHistory),
    createLogger(),
);

export const store = createStore(reducers, middleware);
export const history = syncHistoryWithStore(hashHistory, store);

export const axiosInstance = axios.create({
    baseURL: ROOT_URL
});

axiosInstance.interceptors.response.use(response => response, (err) => {
    if (err.response.status === 403 || err.response.status === 401) {
        store.dispatch(doLogout('Your session expired.'));
        return Promise.reject(err);
    }
    if (err.response.status === 400) {
        return Promise.reject(err);
    }
    
});

export const loggedUser = () => (store.getState().auth.authUser);