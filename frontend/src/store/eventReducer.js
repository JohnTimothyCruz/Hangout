import { csrfFetch } from "./csrf"

// -ActionTypes-------------------------

const GET_EVENTS = 'events/GET_EVENTS'

const GET_EVENT_IMAGES = 'events/GET_EVENT_IMAGES'

// -Actions-------------------------

export const loadEvents = (events) => {
    return {
        type: GET_EVENTS,
        events
    }
}

export const loadEventImages = (images) => {
    return {
        type: GET_EVENT_IMAGES,
        images
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

export const fetchEventImages = () => async dispatch => {
    const res = await csrfFetch('/api/events');

    if (res.ok) {
        const events = await res.json();
        dispatch(loadEvents(events))
    }
}

// -Reducer-------------------------

const initialState = { allEvents: {}, singleEvent: {} }

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            const newState = {};
            action.events.forEach(event => {
                newState[event.id] = event
            })
            return newState;
        default:
            return state;
    }
}

export default EventReducer
