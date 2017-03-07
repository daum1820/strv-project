import { store } from '../lib/config';
import { fetchEvents } from '../actions/eventsActions';

export const checkAlreadyLoggedIn = (nextState, replaceState) => {
    const { authenticated } = store.getState().auth;
    if (authenticated) {
        replaceState('/');
    }
}

export const onHomeEnter = () =>{
    const { authenticated } = store.getState().auth;
    if (authenticated) {
        store.dispatch(fetchEvents());
    }
}