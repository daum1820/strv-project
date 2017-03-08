import { FETCH_EVENT, LIST_EVENTS, SEARCH_EVENT, ATTENDEE_EVENT, UNATTENDEE_EVENT } from '../actions/eventsActions';

const defaultState = () => ({
    list : {},
    selectedEvent : null,
    term : '',
    loading : false
});

export default (state = defaultState(), action) => {
    switch(action.type){
        case `${FETCH_EVENT}_PENDING`: 
        case `${LIST_EVENTS}_PENDING`: 
            return {
                ...state,
                loading: true
            }
        case `${ATTENDEE_EVENT}_FULFILLED`:
        case `${UNATTENDEE_EVENT}_FULFILLED`:{
            const newState = {
                ...state,
                loading : false,
                list: {
                    ...state.list,
                    [action.payload.data.id]: action.payload.data,
                },
            };
            return newState;
        }
        case SEARCH_EVENT:
            return {
                ...state,
                term : action.payload
            }
        case `${FETCH_EVENT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selectedEvent : action.payload.data
            }
        case `${LIST_EVENTS}_FULFILLED` :
            return {
                ...state,
                loading: false,
                list: action.payload.data.reduce((current, next) => {
                    current[next.id] = next;
                    return current;
                }, {})
            }
        default:
            return state;
    }
}