import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import * as eventActions from '../actions/eventsActions';
import reducer from '../reducers/eventsReducer';
import * as Type from '../constants/ActionTypes';
import axios from 'axios';
import expect from 'expect';
import jwToken from '../lib/auth';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const BASE_URL = process.env.BASE_URL;

describe('Events Actions & Reducers', () => {

    it('retrieves all events', async () => {

        const eventId = '58493db9691ecc0d3da51bfd';

        const store = mockStore({ events: {} });
        return store.dispatch(eventActions.listEvents())
            .then(() => {
                const action = store.getActions().find(action => action.type === Type.LIST_EVENTS);
                const result = reducer(undefined, {
                    type : Type.LIST_EVENTS,
                    payload: { data: action.payload.data }
                })
                expect(result.list[eventId]).toExist();
                expect(result.term).toEqual('');
            })
    })

    it('retrieves one event', () => {

        const eventId = '58493db9691ecc0d3da51bfd';
        const store = mockStore({ events: {} });
        return store.dispatch(eventActions.fetchEvent(eventId))
            .then(() => {
                const action = store.getActions().find(action => action.type === Type.FETCH_EVENT);
                const result = reducer(undefined, {
                    type: Type.FETCH_EVENT,
                    payload: { data: action.payload.data }
                })
                expect(result.selectedEvent.id).toEqual(eventId);
            })
    })

    it('creates a new event', () => {
        const event = {
            'title': 'Awesome event',
            'description': 'A bunch of people doing awesome stuff',
            'startsAt': '2016-12-08T10:46:33.901Z',
            'capacity': 100
        };

        const store = mockStore({ events: {} });

        return store.dispatch(eventActions.createEvent(event))
            .then(() => {
                const action = store.getActions().find(action => action.type === Type.CREATE_EVENT);
                const result = reducer(undefined, {
                    type: Type.CREATE_EVENT,
                    payload: { data: action.payload.data }
                })
                const { id } = action.payload.data;
                expect(result.list[id]).toExist();
                expect(result.selectedEvent.id).toEqual(action.payload.data.id);
            })
    })

    it('updates an event', () => {
        const event = {
            'id': '58493db9691ecc0d3da51bfd',
            'title': 'Awesome event',
            'description': 'A bunch of people doing awesome stuff',
            'startsAt': '2016-12-08T10:46:33.901Z',
            'capacity': 50
        };
        const store = mockStore({ events: {} });

        return store.dispatch(eventActions.updateEvent(event, event.id))
            .then(() => {
                const action = store.getActions().find(action => action.type === Type.SAVE_EVENT);
                const result = reducer(undefined, {
                    type: Type.SAVE_EVENT,
                    payload: { data: action.payload.data }
                })
                const { id } = action.payload.data;
                expect(result.list[id]).toExist();
                expect(result.selectedEvent.id).toEqual(action.payload.data.id);
                expect(result.selectedEvent.capacity).toEqual(50);
            })
    })

    it('attends an event', () => {
        const event = {
            'id': '58493db9691ecc0d3da51bfd',
            'title': 'Awesome event',
            'description': 'A bunch of people doing awesome stuff',
            'startsAt': '2016-12-08T10:46:33.901Z',
            'capacity': 50
        };
        const store = mockStore({ events: {} });

        return store.dispatch(eventActions.attendEvent(event.id, '58493e0b691ecc0d3da51bfe'))
            .then(() => {
                const action = store.getActions().find(action => action.type === Type.ATTEND_EVENT);
                const result = reducer(undefined, {
                    type: Type.ATTEND_EVENT,
                    payload: { data: action.payload.data }
                })
                
                expect(result.list[event.id]).toExist();
                expect(result.list[event.id].attendees.length).toEqual(1);
            })
    })

    it('unattends an event', () => {
        const event = {
            'id': '58493db9691ecc0d3da51bfd',
            'title': 'Awesome event',
            'description': 'A bunch of people doing awesome stuff',
            'startsAt': '2016-12-08T10:46:33.901Z',
            'capacity': 50
        };
        const store = mockStore({ events: {} });

        return store.dispatch(eventActions.unattendEvent(event.id, '58493e0b691ecc0d3da51bfe'))
            .then(() => {
                const action = store.getActions().find(action => action.type === Type.UNATTEND_EVENT);
                const result = reducer(undefined, {
                    type: Type.UNATTEND_EVENT,
                    payload: { data: action.payload.data }
                })

                expect(result.list[event.id]).toExist();
                expect(result.list[event.id].attendees.length).toEqual(1);
            })
    })
})