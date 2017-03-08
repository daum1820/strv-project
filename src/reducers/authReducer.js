import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/authActions';
import cookie from 'react-cookie'; 

const token = cookie.load('token');
const userCookie = cookie.load('user-strv-cookie');

const defaultState = () => {
    if (token) {
        return {
            authUser: userCookie,
            authMessage: '',
            authenticated: true,
        };
    }
    return {
        authenticated: false,
    };
};

export default (state = defaultState(), action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authMessage: '',
                authUser: action.payload.data,
                authenticated : true
            };
        case UNAUTH_USER:
            return { ...state, authenticated: false, authUser : null };
        case AUTH_ERROR:
            return { ...state, authenticated: false, authMessage: action.payload };
        default:
            return state;
    }
};