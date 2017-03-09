import { axiosInstance as axios, loggedUser } from '../lib/config';
import { replace } from 'react-router-redux';
import JWT from '../lib/auth';

const DELETE_EVENT = 'DELETE_EVENT';
const NEW_EVENT = 'NEW_EVENT';
const SAVE_EVENT = 'SAVE_EVENT';
const FETCH_EVENT = 'FETCH_EVENT';
const LIST_EVENTS = 'LIST_EVENTS';
const SEARCH_EVENT = 'SEARCH_EVENT';
const ATTEND_EVENT = 'ATTEND_EVENT';
const UNATTEND_EVENT = 'UNATTEND_EVENT';

export const Events = {
    DELETE_EVENT,
    NEW_EVENT,
    SAVE_EVENT,
    FETCH_EVENT,
    LIST_EVENTS,
    SEARCH_EVENT,
    ATTEND_EVENT,
    UNATTEND_EVENT
}

export const listEvents = () =>{
    const request = axios.get('/events');
    return {
        type: LIST_EVENTS,
        payload: request
    }
}

export const fetchEvent = (eventId, userId) => {
    const request = axios.get(`/events/${eventId}`);
    return {
        type: FETCH_EVENT,
        payload: request
    }
}

export const attendEvent = (eventId) => {
    const { id } = loggedUser();
    const request = axios.post(`/events/${eventId}/attendees/me`, { id },
        { headers: { 'Authorization': JWT() } });

    return {
        type: ATTEND_EVENT,
        payload: request,
    }
}

export const unattendEvent = (eventId) => {
    const { id } = loggedUser();
    const request = axios.delete(`/events/${eventId}/attendees/me`,
        { data: { id }, headers: { 'Authorization': JWT() } });

    return {
        type: UNATTEND_EVENT,
        payload: request,
    }
}

export const deleteEvent = (eventId) => {
    const request = axios.delete(`/events/${eventId}`,
        { headers: { 'Authorization': JWT() } });

    return (dispatch) => {
        request.then(response => {
            dispatch({
                type: DELETE_EVENT,
                payload: eventId,
            });
            dispatch(replace('/'));
        }).catch(() => dispatch(replace('/404')));
    }
}

export const searchEvent = term => {
    return {
        type: SEARCH_EVENT,
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
                type: SAVE_EVENT,
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
                type: SAVE_EVENT,
                payload: response,
            });
            dispatch(replace('/'));
        }).catch(() => dispatch(replace('/404')));
    }
}

export const newEvent = () => {
    return {
        type: NEW_EVENT,
        payload : {}
    }
}