import { axiosInstance as axios } from '../lib/config';
import { replace } from 'react-router-redux';
import * as Type from '../constants/ActionTypes';
import JWT from '../lib/auth';

export const listEvents = () =>{
    const request = axios.get('/events');
    return (dispatch) => {
        return request.then(response => {
            dispatch({
                type: Type.LIST_EVENTS,
                payload: response,
            });
        }).catch(() => dispatch(replace('/404')));
    }
}

export const fetchEvent = (eventId, userId) => {
    const request = axios.get(`/events/${eventId}`);
    return (dispatch) => {
        return request.then(response => {
            dispatch({
                type: Type.FETCH_EVENT,
                payload: response,
            });
        }).catch(() => dispatch(replace('/404')));
    }
}

export const attendEvent = (eventId, userId) => {
    const request = axios.post(`/events/${eventId}/attendees/me`, { id: userId },
        { headers: { 'Authorization': JWT() } });
    return (dispatch) => {
        return request.then(response => {
            dispatch({
                type: Type.ATTEND_EVENT,
                payload: response,
            });
        }).catch(() => dispatch(replace('/404')));
    }
}

export const unattendEvent = (eventId, userId) => {
    const request = axios.delete(`/events/${eventId}/attendees/me`,
        { data: { id: userId }, headers: { 'Authorization': JWT() } });
    return (dispatch) => {
        return request.then(response => {
            dispatch({
                type: Type.UNATTEND_EVENT,
                payload: response,
            });
        }).catch(() => dispatch(replace('/404')));
    }
}

export const deleteEvent = (eventId) => {
    const request = axios.delete(`/events/${eventId}`,
        { headers: { 'Authorization': JWT() } });

    return (dispatch) => {
        return request.then(response => {
            dispatch({
                type: Type.DELETE_EVENT,
                payload: eventId,
            });
            dispatch(replace('/'));
        }).catch(() => dispatch(replace('/404')));
    }
}

export const searchEvent = term => {
    return {
        type: Type.SEARCH_EVENT,
        payload: term
    }
}

export const createEvent = (event) =>{
    const request = axios.post('/events', { ...event},
        { headers: { 'Authorization': JWT() } });

    return (dispatch) => {
        return request.then(response => {
            dispatch({
                type: Type.CREATE_EVENT,
                payload: response,
            });
            dispatch(replace(`/events/${response.data.id}`));
        }).catch(() => dispatch(replace('/404')));
    }
}
export const updateEvent = (event, eventId) => {
    const request = axios.patch(`/events/${eventId}`, { ...event},
        { headers: { 'Authorization': JWT() } });
    
    return (dispatch) => {
        return request.then(response => {
            dispatch({
                type: Type.SAVE_EVENT,
                payload: response,
            });
            dispatch(replace('/'));
        }).catch(() => dispatch(replace('/404')));
    }
}

export const newEvent = () => {
    return {
        type: Type.NEW_EVENT,
        payload : {}
    }
}