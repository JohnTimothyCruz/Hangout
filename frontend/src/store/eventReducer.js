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

export const loadSingleEvent = (event, user, group) => {
    return {
        type: GET_SINGLE_EVENT,
        event,
        user,
        group
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
    const eventRes = await csrfFetch(`/api/events/${id}`);

    if (eventRes.ok) {
        const event = await eventRes.json();
        const userId = event.Group.organizerId
        const userRes = await csrfFetch(`/api/users/${userId}`);
        if (userRes.ok) {
            const user = await userRes.json();
            const groupRes = await csrfFetch(`/api/groups/${event.Group.id}`)
            if (groupRes.ok) {
                const group = await groupRes.json()
                dispatch(loadSingleEvent(event, user, group))
            }
        }
    }
}

// -Reducer-------------------------

const initialState = { allEvents: {}, singleEvent: {} }

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            {
                const newState = { ...state, allEvents: { ...state.allEvents }, singleEvent: { ...state.singleEvent } };
                action.events.forEach(event => {
                    newState.allEvents[event.id] = { ...event }
                })
                return newState;
            }
        case GET_SINGLE_EVENT:
        {
            const newState = { ...state };
            newState.singleEvent = action.event;
            newState.singleEvent.organizer = action.user
            newState.singleEvent.Group = action.group
            return newState;
        }
        default:
            return state;
    }
}

export default EventReducer
