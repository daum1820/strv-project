import { replace } from 'react-router-redux';
import { axiosInstance as axios, setAxiosAuthorization} from '../lib/config';
import { clearToken, authToken } from '../lib/auth';
import * as Type from '../constants/ActionTypes';
import http from 'axios/lib/adapters/http';

// Dispatch AUTH_ERROR if something happens during login operation
// or is provided email/password are invalid.
const authErrorHandler = (dispatch, error) => {
    dispatch({
        type: Type.AUTH_ERROR,
        payload: 'E-mail or password is invalid. Please try again.'
    });
};

export const doLogin = data => {
    const request = axios.post('/auth/native', data, { adapter: http });
    return (dispatch) => {
        return request.then(response => {
            
            const { headers: { authorization }, data } = response;
            // Fetching authorization and user data.
            // Data will be stored in client's localStorage.
            authToken(authorization, data);
            
            dispatch({
                type: Type.AUTH_USER,
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
            type: Type.UNAUTH_USER,
            payload: message
        });
        dispatch(replace('/login'));
        return Promise.resolve(Type.UNAUTH_USER);
    }
};

