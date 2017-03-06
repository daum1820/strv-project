import axios from 'axios';
import { push, replace } from 'react-router-redux';
import { ROOT_URL } from '../utils/utils';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const doLogin = data => {
    const request = axios.post(`${ROOT_URL}/auth/native`, data);
    return (dispatch) => {
        request.then(reponse => {
            dispatch({
                type: LOGIN,
                payload: reponse,
            });
            dispatch(replace('/'));
        })
    }
};

export const doLogout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
    dispatch(replace('/login'));
};


export default {
    doLogin,
    doLogout,
};