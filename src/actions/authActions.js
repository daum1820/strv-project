import cookie from 'react-cookie'; 
import { replace } from 'react-router-redux';
import { axiosInstance as axios, setAxiosAuthorization} from '../lib/config';

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
            
            // Fetching authorization and user data.
            // Data will be stored in client's cookies.
            const { headers: { authorization }, data } = response;

            cookie.save('token', authorization, { path: '/' });
            cookie.save('user-strv-cookie', data, { path: '/' });
            dispatch({
                type: AUTH_USER,
                payload: response,
            });
            dispatch(replace('/'));
        }).catch(error => authErrorHandler(dispatch, error));
    }
};

export const doLogout = () => (dispatch) => {
    cookie.remove('token', { path: '/' });
    cookie.remove('user-strv-cookie', { path: '/' });
    dispatch({
        type: UNAUTH_USER,
    });
    dispatch(replace('/login'));
};


export default {
    doLogin,
    doLogout,
};

