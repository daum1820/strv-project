import * as Type from '../constants/ActionTypes';
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
        case Type.AUTH_USER:
            return {
                ...state,
                authMessage: '',
                authUser: action.payload.data,
                authenticated : true
            };
        case Type.UNAUTH_USER:
            return { ...state, authenticated: false, authUser: null, authMessage: action.payload };
        case Type.AUTH_ERROR:
            return { ...state, authenticated: false, authMessage: action.payload };
        default:
            return state;
    }
};