import {createSelector} from 'reselect';
import moment from 'moment';

//Sort upcoming events then the past events.
//Upcoming: Near to Far to sorting
//Past events: Recently to Old sorting
const sortEvents = (current, next) => {
    if (moment().isBefore(current.startsAt) && moment().isBefore(next.startsAt)) {
        return moment(current.startsAt).isAfter(next.startsAt);
    } else if (moment().isAfter(current.startsAt) && moment().isAfter(next.startsAt)) {
        return moment(current.startsAt).isBefore(next.startsAt);
    } else {
        return moment(current.startsAt).isBefore(next.startsAt)
    }
};

const eventsSelector = state => state.events.list;
const termSelector = state => state.events.term;
const userSelector = state => state.auth;

const getEvents = (events, term) =>{
    const arrEvents = _.values(events);
    // Manipulating oject values as an array
    //return all events if a term is not provided.
    return _.filter(arrEvents, event => (event.title.includes(term) || !term)
    ).sort(sortEvents);
};

const getUpcomingEvents = (events, auth) => {
    const { id } = auth.authUser;

    //Filtering upcoming events
    const upcomingEvents = _.values(events).filter(event => moment().isBefore(event.startsAt));

    //Filtering events by ateendee
    const attendeesEvents = _.filter(upcomingEvents, event => 
            (event.attendees.some(attendee => attendee.id === id)))
    
    return attendeesEvents.sort(sortEvents);
};

const getPastEvents = (events, auth) => {
    const { id } = auth.authUser;

    //Filtering past events
    const upcomingEvents = _.values(events).filter(event => moment().isAfter(event.startsAt));

    //Filtering events by ateendee
    const attendeesEvents = _.filter(upcomingEvents, event =>
        (event.attendees.some(attendee => attendee.id === id)))

    return attendeesEvents.sort(sortEvents);
};

const getOwnedEvents = (events, auth) => {
    const { id } = auth.authUser;
    const ownedEvents = _.values(events).filter(event => event.owner.id === id);

    return ownedEvents.sort(sortEvents);
};

export const searchEvents = createSelector(eventsSelector, termSelector, getEvents);
export const upcomingEvents = createSelector(eventsSelector, userSelector, getUpcomingEvents);
export const pastEvents = createSelector(eventsSelector, userSelector, getPastEvents);
export const ownedEvents = createSelector(eventsSelector, userSelector, getOwnedEvents);