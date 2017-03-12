import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import axios from 'axios';
import { syncHistoryWithStore, routerMiddleware, routerReducer as RouterReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { doLogout } from '../actions/authActions';
import { hashHistory } from 'react-router';
import AuthReducer from '../reducers/authReducer';
import EventsReducer from '../reducers/eventsReducer';
import { BASE_URL } from '../utils';
import httpAdapter from 'axios/lib/adapters/http';

const reducers = combineReducers({
    auth: AuthReducer,
    form : FormReducer,
    routing: RouterReducer,
    events :  EventsReducer
});

const middleware = applyMiddleware(
    thunk,
    routerMiddleware(hashHistory),
    createLogger(),
);

export const store = createStore(reducers, middleware);
export const history = process.env.NODE_ENV !== 'test' ? 
        syncHistoryWithStore(hashHistory, store) : hashHistory;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    adapter: httpAdapter
});

axiosInstance.interceptors.response.use(response => response, (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
        store.dispatch(doLogout('Your session expired.'));
        return Promise.reject(error);
    }
    if (error.response.status === 400) {
        return Promise.reject(error);
    }
});

export const loggedUser = () => (store.getState().auth.authUser);