import * as Type from '../constants/ActionTypes';
import moment from 'moment';

const defaultState = () => ({
    list : {},
    selectedEvent : null,
    term : ''
});

export default (state = defaultState(), action) => {
    switch(action.type){
        case Type.FETCH_EVENT:
            return {
                ...state,
                selectedEvent: {
                    ...action.payload.data,
                    startsAt: moment(action.payload.data.startsAt).format('YYYY-MM-DDTHH:mm')
                }
            }
        case Type.LIST_EVENTS:
            return {
                ...state,
                term: '',
                list: action.payload.data.reduce((current, next) => {
                    current[next.id] = next;
                    return current;
                }, {})
            } 
        case Type.ATTEND_EVENT:
        case Type.UNATTEND_EVENT: {
            const newState = {
                ...state,
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
        case Type.CREATE_EVENT: {
            return {
                ...state,
                list:{
                    ...state.list,
                    [action.payload.data.id]: action.payload.data
                },
                selectedEvent: {
                    ...action.payload.data,
                    startsAt: moment(action.payload.data.startsAt).format('YYYY-MM-DDTHH:mm')
                }
            }
        }
        case Type.SAVE_EVENT:
            return {
                ...state,
                list : {
                    ...state.list,
                    [action.payload.data.id]: action.payload.data,
                },
                selectedEvent: {
                    ...action.payload.data,
                    startsAt: moment(action.payload.data.startsAt).format('YYYY-MM-DDTHH:mm')
                }
            }
        case Type.DELETE_EVENT:
            const list = {
                ...state.list,
            }
            delete list[action.payload];

            return {
                ...state,
                ...list
            }
        case Type.NEW_EVENT:
            return {
                ...state,
                selectedEvent: null
            }
        case Type.SEARCH_EVENT:
            return {
                ...state,
                term: action.payload
            }
        default:
            return state;
    }
}