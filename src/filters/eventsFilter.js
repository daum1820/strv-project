import {createSelector} from 'reselect';

const eventsSelector = state => state.events.list;
const termSelector = state => state.events.term;

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

export default createSelector(eventsSelector, termSelector, getEvents);