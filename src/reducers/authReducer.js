import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/authActions';
import JWT, { userDetails } from '../lib/auth';
const defaultState = () => {
    const token = JWT();
    if (token) {
        return {
            authUser: userDetails(),
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
            return { ...state, authenticated: false, authUser: null, authMessage: action.payload };
        case AUTH_ERROR:
            return { ...state, authenticated: false, authMessage: action.payload };
        default:
            return state;
    }
};