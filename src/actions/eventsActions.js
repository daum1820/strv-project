import { axiosInstance as axios, loggedUser } from '../lib/config';
import { replace } from 'react-router-redux';
import * as Type from '../constants/ActionTypes';
import JWT from '../lib/auth';

export const listEvents = () =>{
    const request = axios.get('/events');
    return {
        type: Type.LIST_EVENTS,
        payload: request
    }
}

export const fetchEvent = (eventId, userId) => {
    const request = axios.get(`/events/${eventId}`);
    return {
        type: Type.FETCH_EVENT,
        payload: request
    }
}

export const attendEvent = (eventId) => {
    const { id } = loggedUser();
    const request = axios.post(`/events/${eventId}/attendees/me`, { id },
        { headers: { 'Authorization': JWT() } });

    return {
        type: Type.ATTEND_EVENT,
        payload: request,
    }
}

export const unattendEvent = (eventId) => {
    const { id } = loggedUser();
    const request = axios.delete(`/events/${eventId}/attendees/me`,
        { data: { id }, headers: { 'Authorization': JWT() } });

    return {
        type: Type.UNATTEND_EVENT,
        payload: request,
    }
}

export const deleteEvent = (eventId) => {
    const request = axios.delete(`/events/${eventId}`,
        { headers: { 'Authorization': JWT() } });

    return (dispatch) => {
        request.then(response => {
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
    const { id } = loggedUser();
    const request = axios.post('/events', { ...event},
        { headers: { 'Authorization': JWT() } });

    return (dispatch) => {
        request.then(response => {
            dispatch({
                type: Type.SAVE_EVENT,
                payload: response,
            });
            dispatch(replace(`/events/${response.data.id}`));
        }).catch(() => dispatch(replace('/404')));
    }
}
export const updateEvent = (event, eventId) => {
    const { id } = loggedUser();
    const request = axios.patch(`/events/${eventId}`, { ...event},
        { headers: { 'Authorization': JWT() } });
    
    return (dispatch) => {
        request.then(response => {
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