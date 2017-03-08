import {createSelector} from 'reselect';
import moment from 'moment';

const eventsSelector = state => state.events.list;
const termSelector = state => state.events.term;
const userSelector = state => state.auth;

const getEvents = (events, term) =>{
    const arrEvents = _.values(events);
    // Manipulating oject values as an array
    //return all events if a term is not provided.
    return _.filter(arrEvents, event => (event.title.includes(term) || !term)
    ).reduce((current, next) => {
        current[next.id] = next;
        return current;
    }, {});
};

const getUpcomingEvents = (events, auth) => {
    const { id } = auth.authUser;

    //Filtering upcoming events
    const upcomingEvents = _.values(events).filter(event => moment().isBefore(event.startsAt));

    //Filtering events by ateendee
    var attendeesEvents = _.filter(upcomingEvents, event => 
            (event.attendees.some(attendee => attendee.id === id)))
    
    return attendeesEvents.reduce((current, next) => {
                current[next.id] = next;
                return current;
            }, {});
};

const getPastEvents = (events, auth) => {
    const { id } = auth.authUser;

    //Filtering past events
    const upcomingEvents = _.values(events).filter(event => moment().isAfter(event.startsAt));

    //Filtering events by ateendee
    var attendeesEvents = _.filter(upcomingEvents, event =>
        (event.attendees.some(attendee => attendee.id === id)))

    return attendeesEvents.reduce((current, next) => {
        current[next.id] = next;
        return current;
    }, {});
};

const getOwnedEvents = (events, auth) => {
    const { id } = auth.authUser;
    const ownedEvents = _.values(events).filter(event => event.owner.id === id);

    return ownedEvents.reduce((current, next) => {
        current[next.id] = next;
        return current;
    }, {});
};

export const searchEvents = createSelector(eventsSelector, termSelector, getEvents);
export const upcomingEvents = createSelector(eventsSelector, userSelector, getUpcomingEvents);
export const pastEvents = createSelector(eventsSelector, userSelector, getPastEvents);
export const ownedEvents = createSelector(eventsSelector, userSelector, getOwnedEvents);