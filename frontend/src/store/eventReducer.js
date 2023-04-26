import { csrfFetch } from "./csrf"

// -ActionTypes-------------------------

const GET_EVENTS = 'events/GET_EVENTS'

const GET_EVENT_ATTENDEES = 'events/GET_EVENT_ATTENDEES'

const GET_SINGLE_EVENT = 'events/GET_SINGLE_EVENT'

const POST_EVENT = 'events/POST_EVENT'

const POST_EVENT_ATTENDEE = 'events/POST_EVENT_ATTENDEE'

const DELETE_EVENT = 'events/DELETE_EVENT'

const DELETE_EVENT_ATTENDEE = 'events/DELETE_EVENT_ATTENDEE'

const CLEAR_EVENT = 'events/CLEAR_EVENT'

const CLEAR_EVENTS = 'events/CLEAR_EVENTS'

// -Actions-------------------------

export const loadEvents = (events) => {
    return {
        type: GET_EVENTS,
        events
    }
}

export const loadEventAttendees = (attendees) => {
    return {
        type: GET_EVENT_ATTENDEES,
        attendees
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

export const createEventAttendee = (eventId, attendance) => {
    return {
        type: POST_EVENT_ATTENDEE,
        eventId,
        attendance
    }
}

export const removeEvent = (id) => {
    return {
        type: DELETE_EVENT,
        id
    }
}

export const removeEventAttendee = (userId) => {
    return {
        type: DELETE_EVENT_ATTENDEE,
        userId
    }
}

export const clearEvent = () => {
    return {
        type: CLEAR_EVENT
    }
}

export const clearEvents = () => {
    return {
        type: CLEAR_EVENTS
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

export const fetchEventAttendees = (eventId) => async dispatch => {
    const attendRes = await csrfFetch(`/api/events/${eventId}/attendees`)

    if (attendRes.ok) {
        const attendees = await attendRes.json();
        dispatch(loadEventAttendees(attendees))
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
                return event
            }
        }
    }
    return {"message": "server problems"}
}

export const postEvent = (eventInfo, user, group) => async dispatch => {
    const eventRes = await csrfFetch(`/api/groups/${group.id}/events`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventInfo)
    })

    if (eventRes.ok) {
        const event = await eventRes.json()
        console.log(event)

        const imgRes = await csrfFetch(`/api/events/${event.id}/images`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...eventInfo.image })
        })

        if (imgRes.ok) {
            const img = await imgRes.json()
            dispatch(createEvent(event, img, user, group))

            return event
        }
    }
}

export const postEventAttendee = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    })

    if (res.ok) {
        const attendance = await res.json();
        dispatch(createEventAttendee(eventId, attendance));

        return attendance
    } else {
        const attendance = await res.json();
        return attendance
    }
}

export const deleteEvent = (user, id) => async (dispatch) => {
    const req = { ...user, ...id }
    const res = await csrfFetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req)
    })

    if (res.ok) {
        const deleteRes = await res.json()
        dispatch(removeEvent(id))
        return deleteRes
    }
}

export const deleteEventAttendee = (eventId, userId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId})
    })

    if (res.ok) {
        const deleteRes = await res.json();
        dispatch(removeEventAttendee(userId));
        return deleteRes;
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
        case GET_EVENT_ATTENDEES:
            {
                const newState = { ...state };
                newState.singleEvent.attendees = [...action.attendees.Attendees]
                return newState
            }
        case GET_SINGLE_EVENT:
            {
                const newState = { ...state };
                newState.singleEvent = { ...state.singleEvent, ...action.event };
                newState.singleEvent.Organizer = action.user
                newState.singleEvent.Group = action.group
                return newState;
            }
        case POST_EVENT:
            {
                const newState = { ...state };
                newState.singleEvent = { ...action.event }
                newState.singleEvent.Group = { ...action.group }
                newState.singleEvent.Events = {}
                newState.singleEvent.Venues = [{}]
                newState.singleEvent.Organizer = { ...action.user }
                newState.singleEvent.EventImages = [{ ...action.img }]
                return newState;
            }
        case POST_EVENT_ATTENDEE:
            {
                const newState = { ...state };
                newState.singleEvent.attendees.push(action.attendance);
                return newState;
            }
        case DELETE_EVENT:
            {
                const newState = { ...state }
                newState.singleEvent = {}
                delete newState.allEvents[action.id]
                return newState
            }
        case DELETE_EVENT_ATTENDEE:
            {
                const newState = { ...state }
                const updated = newState.singleEvent.attendees.filter(attendee => attendee.userId !== action.userId)
                console.log(updated)
                newState.singleEvent.attendees = updated
                return newState
            }
        case CLEAR_EVENT:
            {
                const newState = { ...state };
                newState.singleEvent = {}
                return newState
            }
        case CLEAR_EVENTS:
            {
                const newState = { ...state };
                newState.allEvents = {}
                return newState
            }
        default:
            return state;
    }
}

export default EventReducer
