import { csrfFetch } from "./csrf"

// -ActionTypes-------------------------

const GET_GROUPS = 'groups/GET_GROUPS'

const GET_GROUP = 'groups/GET_GROUP'

const POST_GROUP = 'groups/POST-GROUP'

// -Actions-------------------------

export const loadGroups = (groups) => {
    return {
        type: GET_GROUPS,
        groups
    }
}

export const loadGroup = (group, events) => {
    return {
        type: GET_GROUP,
        group,
        events
    }
}

export const createGroup = (group) => {
    return {
        type: POST_GROUP,
        group
    }
}

// -Thunks-------------------------

export const fetchGroups = () => async dispatch => {
    const res = await csrfFetch('/api/groups');

    if (res.ok) {
        const groups = await res.json();
        dispatch(loadGroups(groups))
    }
}

export const fetchGroup = (id) => async dispatch => {
    const groupRes = await csrfFetch(`/api/groups/${id}`);

    if (groupRes.ok) {
        const group = await groupRes.json();
        const eventsRes = await csrfFetch(`/api/groups/${id}/events`);

        if (eventsRes.ok) {
            const events = await eventsRes.json();
            //For of look up promise.all too
            let i = 0
            for (const event of Object.values(events)) {
                const eventImgRes = await csrfFetch(`/api/events/${event.id}`)

                if (eventImgRes.ok) {
                    const eventImg = await eventImgRes.json()
                    events[i].url = eventImg.EventImages[0].url
                    dispatch(loadGroup(group, events))
                }
                i++
            }
        }
    }
}

export const postGroup = (groupInfo) => async (dispatch) => {
    const res = await csrfFetch('/api/groups', {
        method: 'POST',
        headers: {"Content-Type": "applicatioin.json"},
        body: JSON.stringify(groupInfo)
    })

    if (res.ok) {
        const group = await res.json()
        dispatch(createGroup(group))
    }
}

// -Reducer-------------------------

const initialState = { allGroups: {}, singleGroup: {} }

const GroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUPS:
            {
                const newState = { ...state, allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup } };
                action.groups.forEach(group => {
                    newState.allGroups[group.id] = { ...group}
                })
                return newState;
            }
        case GET_GROUP:
            {
                const newState = { ...state, allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup } }
                newState.singleGroup = { ...action.group }
                newState.singleGroup.Events = {}
                action.events.forEach(event => {
                    newState.singleGroup.Events[event.id] = event
                })
                return newState;
            }
        case POST_GROUP:
            {
                const newState = {
                    ...state,
                    allGroups: { ...state.allGroups, [action.group.id]: action.group},
                    singleGroup: { ...action.group }
                };
                return newState;
            }
        default:
            return state;
    }
}

export default GroupReducer
