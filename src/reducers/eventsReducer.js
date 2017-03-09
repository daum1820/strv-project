import { Events }  from '../actions/eventsActions';
import moment from 'moment';

const defaultState = () => ({
    list : {},
    selectedEvent : null,
    term : '',
    loading : false
});

export default (state = defaultState(), action) => {
    switch(action.type){
        case `${Events.FETCH_EVENT}_PENDING`: 
        case `${Events.LIST_EVENTS}_PENDING`: 
            return {
                ...state,
                loading: true
            }
        case `${Events.FETCH_EVENT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selectedEvent: {
                    ...action.payload.data,
                    startsAt: moment(action.payload.data.startsAt).format('YYYY-MM-DDTHH:mm')
                }
            }
        case `${Events.LIST_EVENTS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                list: action.payload.data.reduce((current, next) => {
                    current[next.id] = next;
                    return current;
                }, {})
            } 
        case `${Events.ATTEND_EVENT}_FULFILLED`:
        case `${Events.UNATTEND_EVENT}_FULFILLED`:{
            const newState = {
                ...state,
                loading : false,
                selectedEvent: {
                    ...action.payload.data,
                    startsAt: moment(action.payload.data.startsAt).format('YYYY-MM-DDTHH:mm')
                },
                list: {
                    ...state.list,
                    [action.payload.data.id]: action.payload.data,
                },
            };
            return newState;
        }
        case Events.CREATE_EVENT: {
            const list = {
                ...state.list,
                [action.payload.data.id] : action.payload.data
            }
            return {
                ...state,
                loading: false,
                list: list,
                selectedEvent: {
                    ...action.payload.data,
                    startsAt: moment(action.payload.data.startsAt).format('YYYY-MM-DDTHH:mm')
                }
            }
        }
        case Events.SAVE_EVENT:
            return {
                ...state,
                loading: false,
                list : {
                    ...state.list,
                    [action.payload.data.id]: action.payload.data,
                },
                selectedEvent: {
                    ...action.payload.data,
                    startsAt: moment(action.payload.data.startsAt).format('YYYY-MM-DDTHH:mm')
                }
            }
        case Events.DELETE_EVENT:
            const list = {
                ...state.list,
            }
            delete list[action.payload];

            return {
                ...state,
                loading: false,
                ...list
            }
        case Events.NEW_EVENT:
            return {
                ...state,
                selectedEvent: null
            }
        case Events.SEARCH_EVENT:
            return {
                ...state,
                term: action.payload
            }
        default:
            return state;
    }
}