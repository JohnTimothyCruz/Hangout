import { csrfFetch } from "./csrf"

// -ActionTypes-------------------------

const GET_EVENTS = 'events/GET_EVENTS'

const GET_SINGLE_EVENT = 'events/GET_SINGLE_EVENT'

const POST_EVENT = 'events/POST_EVENT'

const DELETE_EVENT = 'events/DELETE_EVENT'

const CLEAR_EVENT = 'events/CLEAR_EVENT'

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

export const createEvent = (event, image, user, group) => {
    return {
        type: POST_EVENT,
        event,
        image,
        user,
        group
    }
}

export const removeEvent = (id) => {
    return {
        type: DELETE_EVENT,
        id
    }
}

export const clearEvent = () => {
    return {
        type: CLEAR_EVENT
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

export const postEvent = (eventInfo, user, group) => async dispatch => {
    const eventRes = await csrfFetch(`/api/groups/${group.id}/events`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventInfo)
    })

    if (eventRes.ok) {
        const event = await eventRes.json()

        console.log('Thunk here: ', event)
        const imgRes = await csrfFetch(`/api/events/${event.id}/images`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: eventInfo.image, preview: true })
        })

        if (imgRes.ok) {
            const img = await imgRes.json()
            dispatch(createEvent(event, img, user, group))

            return event
        }
    }
}

export const deleteEvent = (user, id) => async (dispatch) => {
    const req = { ...user, ...id }
    const deleteRes = await csrfFetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req)
    })

    if (deleteRes.ok) {
        dispatch(removeEvent(id))
        return deleteRes
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
                newState.singleEvent.Organizer = action.user
                newState.singleEvent.Group = action.group
                return newState;
            }
        case POST_EVENT:
            {
                const newState = { ...state };
                // newState.allEvents[action.event.id] = { ...action.event }
                newState.singleEvent = { ...action.event }
                newState.singleEvent.Group = { ...action.group }
                newState.singleEvent.Events = {}
                newState.singleEvent.Venues = [{}]
                newState.singleEvent.Organizer = { ...action.user }
                newState.singleEvent.EventImages = [{ ...action.img }]
                return newState;
            }
        case DELETE_EVENT:
            {
                const newState = { ...state }
                newState.singleEvent = {}
                delete newState.allEvents[action.id]
                return newState
            }
        case CLEAR_EVENT:
            {
                const newState = { ...state };
                newState.singleEvent = {}
                return newState
            }
        default:
            return state;
    }
}

export default EventReducer
