import { LOGIN, LOGOUT } from '../actions/loginActions';

const defaultState = () => {
    if (localStorage.user) {
        return {
            loggedIn: true,
        };
    }
    return {
        loggedIn: false,
    };
};

export default (state = defaultState(), action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.user = action.payload.data.id;
            return {
                ...state,
                loggedIn: true,
            };
        case LOGOUT:
            delete localStorage.user;
            return {
                loggedIn: false,
            };
        default:
            return state;
    }
};