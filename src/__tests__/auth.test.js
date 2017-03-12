import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import * as authActions from '../actions/authActions';
import reducer from '../reducers/authReducer';
import * as Type from '../constants/ActionTypes';
import axios from 'axios';
import expect from 'expect';
import jwToken from '../lib/auth';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const BASE_URL = process.env.BASE_URL;

describe('Auth Actions & Reducers', () => {

    it('performs a successfull login attempt', () => {

        const user = {
            authMessage: '',
            authUser: {
                "id": "58493e0b691ecc0d3da51bfe",
                "firstName": "Robert",
                "lastName": "Rossmann",
                "email": "robert.rossmann@strv.com",
                "createdAt": "2016-12-08T10:46:33.901Z",
                "updatedAt": "2016-12-08T10:46:33.901Z"
            },
            authenticated : true
        }

        const credentials = {
            "email": "robert.rossmann@strv.com",
            "password": "top secret!"
        }

        const store = mockStore({ auth: {} });

        return store.dispatch(authActions.doLogin(credentials))
            .then(() => {
                const action = store.getActions().find(action => action.type === Type.AUTH_USER);
                const result = reducer(undefined, {
                    type: Type.AUTH_USER,
                    payload: { data: action.payload.data }
                });

                expect(result).toEqual(user); 
            })
    })

    it('performs a logout attempt', () => {
        const store = mockStore({ auth: {} });
        localStorage.setItem('jwToken', 'SajkD0nK3yK0nG');
        return store.dispatch(authActions.doLogout()).then(() => {
            const action = store.getActions().find(action => action.type === Type.UNAUTH_USER);
            expect(jwToken()).toEqual(null)
            expect(action).toExist()
        })
        
    })
})