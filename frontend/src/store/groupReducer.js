import { csrfFetch } from "./csrf"

// -ActionTypes-------------------------

const GET_GROUPS = 'groups/GET_GROUPS'

const GET_GROUP_IMAGES = 'groups/GET_GROUP_IMAGES'

// -Actions-------------------------

export const loadGroups = (groups) => {
    return {
        type: GET_GROUPS,
        groups
    }
}

export const loadGroupImages = (groups) => {
    return {
        type: GET_GROUP_IMAGES,
        groups
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

// export const fetchGroupImages = () => async dispatch => {
//     const res = await csrfFetch('/api/groups');

//     if (res.ok) {
//         const groups = await res.json();
//         dispatch(loadEvents(group))
//     }
// }

// -Reducer-------------------------

const initialState = { allGroups: {}, singleGroup: {} }

const GroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUPS:
            const newState = {};
            action.groups.forEach(group => {
                newState[group.id] = group
            })
            return newState;
        default:
            return state;
    }
}

export default GroupReducer
