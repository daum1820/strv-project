
import { axiosInstance as axios, token } from '../lib/config';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const SEARCH_EVENT = 'SEARCH_EVENT';

export const fetchEvents = () =>{
    const request = axios.get('/events');
    return (dispatch) => {
        request.then(response => dispatch({
            type: FETCH_EVENTS,
            payload: response
        }))
    }
}

export const searchEvent = term => {
    return {
        type: SEARCH_EVENT,
        payload: term
    }
}