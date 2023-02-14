import { csrfFetch } from "./csrf"

// -ActionTypes-------------------------

const GET_EVENTS = 'events/GET_EVENTS'

const GET_SINGLE_EVENT = 'events/GET_SINGLE_EVENT'

// -Actions-------------------------

export const loadEvents = (events) => {
    return {
        type: GET_EVENTS,
        events
    }
}

export const loadSingleEvent = (event) => {
    return {
        type: GET_SINGLE_EVENT,
        event
    }
}

// -Thunks-------------------------

export const fetchEvents = () => async dispatch => {
    const res = await csrfFetch('/api/events');

    if (res.ok) {
        const events = await res.json();
        dispatch(loadEvents(events))
    }
}

export const fetchSingleEvent = (id) => async dispatch => {
    const res = await csrfFetch(`/api/events/${id}`);

    if (res.ok) {
        const event = await res.json();
        dispatch(loadSingleEvent(event))
    }
}

// -Reducer-------------------------

const initialState = { allEvents: {}, singleEvent: {} }

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            {
                const newState = {};
                action.events.forEach(event => {
                    newState[event.id] = event
                })
                return newState;
            }
        case GET_SINGLE_EVENT:
        {
            const newState = { ...state };
            newState.singleEvent = action.event;
            return newState;
        }
        default:
            return state;
    }
}

export default EventReducer
