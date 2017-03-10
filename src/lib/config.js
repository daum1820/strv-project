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
import { BASE_URL } from '../utils';

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
export const history = process.env.NODE_ENV !== 'test' ? 
        syncHistoryWithStore(hashHistory, store) : hashHistory;

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.response.use(response => response, (error) => {
    if (err.response.status === 403 || err.response.status === 401) {
        store.dispatch(doLogout('Your session expired.'));
        return Promise.reject(error);
    }
    if (err.response.status === 400) {
        return Promise.reject(error);
    }
    
});

export const loggedUser = () => (store.getState().auth.authUser);