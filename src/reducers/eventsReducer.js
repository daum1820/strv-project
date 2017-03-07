import { FETCH_EVENTS, SEARCH_EVENT } from '../actions/eventsActions';

const defaultState = () => ({
    list : {},
    selectedEvent : null,
    term : '',
});

export default (state = defaultState(), action) => {
    switch(action.type){
        case SEARCH_EVENT:
            return {
                ...state,
                term : action.payload
            }
        case FETCH_EVENTS :
            return {
                ...state,
                list: action.payload.data.reduce((current, next) => {
                    current[next.id] = next;
                    return current;
                }, {})
            }
        default:
            return state;
    }
}