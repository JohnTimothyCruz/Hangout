import { csrfFetch } from "./csrf"

// -ActionTypes-------------------------

const GET_GROUPS = 'groups/GET_GROUPS'

const GET_GROUP = 'groups/GET_GROUP'

const GET_GROUP_MEMBERS = 'groups/GET_GROUP_MEMBERS'

const POST_GROUP = 'groups/POST_GROUP'

const POST_GROUP_MEMBER = 'groups/POST_GROUP_MEMBER'

const POST_GROUP_IMAGE = 'groups/POST_GROUP_IMAGE'

const PUT_GROUP = 'groups/PUT_GROUP'

const DELETE_GROUP = 'groups/DELETE_GROUP'

const DELETE_GROUP_IMAGE = 'groups/DELETE_GROUP_IMAGE'

const CLEAR_GROUP = 'groups/CLEAR_GROUP'

const CLEAR_GROUPS = 'groups/CLEAR_GROUPS'

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

export const loadGroupMembers = (members) => {
    return {
        type: GET_GROUP_MEMBERS,
        members
    }
}

export const createGroup = (group, img, user, venue) => {
    return {
        type: POST_GROUP,
        group,
        img,
        user,
        venue
    }
}

export const createGroupMember = (groupId, membership) => {
    return {
        type: POST_GROUP_MEMBER,
        groupId,
        membership
    }
}

export const createGroupImage = (image) => {
    return {
        type: POST_GROUP_IMAGE,
        image
    }
}

export const updateGroup = (group, img, user, events, venues, images) => {
    return {
        type: PUT_GROUP,
        group,
        img,
        user,
        events,
        venues,
        images
    }
}

export const removeGroup = (id) => {
    return {
        type: DELETE_GROUP,
        id
    }
}

export const removeGroupImage = (id) => {
    return {
        type: DELETE_GROUP_IMAGE,
        id
    }
}

export const clearGroup = () => {
    return {
        type: CLEAR_GROUP
    }
}

export const clearGroups = () => {
    return {
        type: CLEAR_GROUPS
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

            if (events[0]) {
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
            } else {
                dispatch(loadGroup(group, events))
            }
        }
    }
}

export const fetchGroupMembers = (id) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${id}/members`)

    if (res.ok) {
        const members = await res.json()
        dispatch(loadGroupMembers(members))

        return members
    }
}

export const postGroup = (groupInfo, user) => async dispatch => {
    const groupRes = await csrfFetch('/api/groups', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupInfo)
    })

    if (groupRes.ok) {
        const group = await groupRes.json()

        const venueRes = await csrfFetch(`/api/groups/${group.id}/venues`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                groupId: group.id,
                address: 'Online',
                city: 'Online',
                lat: 1,
                lng: 1,
                state: 'Online'
            })
        })

        if (venueRes.ok) {
            const venue = await venueRes.json()

            const imgRes = await csrfFetch(`/api/groups/${group.id}/images`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(groupInfo.imageInfo)
            })

            if (imgRes.ok) {
                const img = await imgRes.json()
                dispatch(createGroup(group, img, user, venue))

                return group
            }
        }
    }
}

export const postGroupMember = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        const membership = await res.json();
        dispatch(createGroupMember(groupId, membership))

        return membership
    }
}

export const postGroupImage = (groupId, url, description, preview) => async (dispatch) => {
    const imageRes = await csrfFetch(`/api/groups/${groupId}/images`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, preview, description })
    })

    if (imageRes.ok) {
        const image = await imageRes.json()

        dispatch(createGroupImage(image))

        return image
    } else {
        const res = await imageRes.json()
        console.log(res)
    }
}

export const putGroup = (groupInfo, user, events, venues, images) => async (dispatch) => {
    const groupRes = await csrfFetch(`/api/groups/${groupInfo.id}/edit`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupInfo)
    })

    if (groupRes.ok) {
        const group = await groupRes.json()

        let img = null;

        if (groupInfo.imageInfo.url) {
            const imgRes = await csrfFetch(`/api/groups/${group.id}/images`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(groupInfo.imageInfo)
            })

            if (imgRes.ok) {
                img = await imgRes.json()
            }
        }
        dispatch(updateGroup(group, img, user, events, venues, images))

        return group
    }
}

export const deleteGroup = (user, id) => async (dispatch) => {
    const req = { ...user, ...id }
    const res = await csrfFetch(`/api/groups/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req)
    })

    if (res.ok) {
        const deleteRes = res.json()
        dispatch(removeGroup(id))
        return deleteRes
    }
}

export const deleteGroupImage = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/group-images/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
        const response = await res.json()
        dispatch(removeGroupImage(id))
        return response
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
                    newState.allGroups[group.id] = { ...group }
                })
                return newState;
            }
        case GET_GROUP:
            {
                const newState = { ...state, allGroups: { ...state.allGroups }, singleGroup: { ...state.singleGroup } }
                newState.singleGroup = { ...state.singleGroup, ...action.group }
                newState.singleGroup.Events = {}
                action.events.forEach(event => {
                    newState.singleGroup.Events[event.id] = event
                })
                return newState;
            }
        case GET_GROUP_MEMBERS:
            {
                const newState = { ...state };
                newState.singleGroup.members = [ ...action.members.members ]
                return newState
            }
        case POST_GROUP:
            {
                const newState = { ...state };
                newState.singleGroup = { ...action.group }
                newState.singleGroup.Events = {}
                newState.singleGroup.Venues = [action.venue]
                newState.singleGroup.Organizer = { ...action.user }
                newState.singleGroup.GroupImages = [{ ...action.img }]
                return newState;
            }
        case POST_GROUP_MEMBER:
            {
                const newState = { ...state };
                newState.singleGroup.members.push(action.membership)
                return newState
            }
        case POST_GROUP_IMAGE:
            {
                const newState = { ...state }
                newState.singleGroup.images = [...state.singleGroup.GroupImages, action.image]
                return newState
            }
        case PUT_GROUP:
            {
                const newState = { ...state };
                newState.singleGroup = { ...action.group }
                newState.singleGroup.Organizer = { ...action.user }
                newState.singleGroup.Events = { ...action.events }
                newState.singleGroup.Venues = { ...action.venues }
                newState.singleGroup.GroupImages = { ...action.images }
                if (action.img) {
                    newState.singleGroup.GroupImages[0] = { ...action.img }
                }
                return newState;
            }
        case DELETE_GROUP:
            {
                const newState = { ...state }
                newState.singleGroup = {}
                delete newState.allGroups[action.id]
                return newState
            }
        case DELETE_GROUP_IMAGE:
            {
                const newState = { ...state }
                const updated = Object.values(newState.singleGroup.GroupImages).filter(img => img.id !== action.id)
                newState.singleGroup.GroupImages = [ ...updated ]
                return newState
            }
        case CLEAR_GROUP:
            {
                const newState = { ...state }
                newState.singleGroup = {}
                return newState
            }
        case CLEAR_GROUPS:
            {
                const newState = { ...state }
                newState.allGroups = {}
                return newState
            }
        default:
            return state;
    }
}

export default GroupReducer
