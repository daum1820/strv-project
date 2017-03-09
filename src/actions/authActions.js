
import { replace } from 'react-router-redux';
import { axiosInstance as axios, setAxiosAuthorization} from '../lib/config';
import { clearToken, authToken } from '../lib/auth';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

// Dispatch AUTH_ERROR if something happens during login operation
// or is provided email/password are invalid.
const authErrorHandler = (dispatch, error) => {
    dispatch({
        type : AUTH_ERROR,
        payload: 'E-mail or password is invalid. Please try again.'
    });
};

export const doLogin = data => {
    const request = axios.post('/auth/native', data);
    return (dispatch) => {
        request.then(response => {
            
            const { headers: { authorization }, data } = response;
            // Fetching authorization and user data.
            // Data will be stored in client's localStorage.
            authToken(authorization, data);
            
            dispatch({
                type: AUTH_USER,
                payload: response,
            });
            dispatch(replace('/'));
        }).catch(error => authErrorHandler(dispatch, error));
    }
};

export const doLogout = (message) => {
    return (dispatch) => {
        clearToken();
        dispatch({
            type: UNAUTH_USER,
            payload : message
        });
        dispatch(replace('/login'));
    }
};


export default {
    doLogin,
    doLogout,
};

