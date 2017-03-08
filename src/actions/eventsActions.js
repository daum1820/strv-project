import cookie from 'react-cookie'; 
import { axiosInstance as axios, loggedUser } from '../lib/config';

const token = cookie.load('token', { path: '/' });
export const FETCH_EVENT = 'FETCH_EVENT';
export const LIST_EVENTS = 'LIST_EVENTS';
export const SEARCH_EVENT = 'SEARCH_EVENT';
export const ATTENDEE_EVENT = 'ATTENDEE_EVENT';
export const UNATTENDEE_EVENT = 'UNATTENDEE_EVENT';

export const listEvents = () =>{
    const request = axios.get('/events');
    return {
        type: LIST_EVENTS,
        payload: request
    }
}

export const fetchEvent = (eventId) => {
    const request = axios.get(`/events/${eventId}`);
    return {
        type: FETCH_EVENT,
        payload: request
    }
}

export const attendEvent = (eventId) => {
    const { id } = loggedUser();
    const request = axios.post(`/events/${eventId}/attendees/me`, { id },
        { headers: { 'Authorization': token } });
    return {
        type: ATTENDEE_EVENT,
        payload: request,
        args: eventId
    }
}

export const unattendEvent = (eventId) => {
    const { id } = loggedUser();
    const request = axios.delete(`/events/${eventId}/attendees/me`,
        { data: { id }, headers: { 'Authorization': token } });
    return {
        type: UNATTENDEE_EVENT,
        payload: request,
        args: eventId
    }
}

export const searchEvent = term => {
    return {
        type: SEARCH_EVENT,
        payload: term
    }
}