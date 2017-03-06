import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import axios from 'axios';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { doLogout } from '../actions/loginActions';
import { hashHistory } from 'react-router';
import LoginReducer from '../reducers/loginReducer';
import { reducer as FormReducer } from 'redux-form';

const reducers = combineReducers({
    auth : LoginReducer,
    form : FormReducer,
    routing: routerReducer
});

const middleware = applyMiddleware(
    thunk,
    routerMiddleware(hashHistory),
    createLogger(),
);

export const store = createStore(reducers, middleware);
export const history = syncHistoryWithStore(hashHistory, store);

axios.interceptors.response.use(response => response, (err) => {
    if (err.response.status === 403) {
        store.dispatch(doLogout);
    }
});