import { store } from '../lib/config';
import { listEvents, fetchEvent, newEvent } from '../actions/eventsActions';

export const checkAlreadyLoggedIn = (nextState, replaceState) => {
    const { authenticated } = store.getState().auth;
    if (authenticated) {
        replaceState('/');
    }
}

export const checkAuth = (nextState, replaceState) => {
    const { authenticated } = store.getState().auth;
    if (!authenticated) {
        replaceState('/login');
    }
}

export const onHomeEnter = (nextState, replaceState) => {
    const { authenticated } = store.getState().auth;
    if (authenticated) {
        store.dispatch(listEvents());
    }
}
export const onUserEnter = onHomeEnter;

export const onEventEnter = (nextState, replaceState) => {
    const { authenticated, authUser : {id : userId} } = store.getState().auth;
    if (authenticated) {
        store.dispatch(fetchEvent(nextState.params.id, userId));
    }
}

export const onNewEventEnter = (nextState, replaceState) => {
    const { authenticated } = store.getState().auth;
    if (authenticated) {
        store.dispatch(newEvent());
    }
}