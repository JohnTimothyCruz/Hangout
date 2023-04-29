import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { deleteEventAttendee, fetchEventAttendees, fetchSingleEvent, postEventAttendee, putEventAttendee } from '../../store/eventReducer'
import DeleteEventModal from '../DeleteEventModal'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import './SingleEvent.css'
import { clearGroup, clearGroups, fetchGroupMembers } from '../../store/groupReducer'

const getStartTime = (event) => {
    const startTime = new Date(event.startDate)
    return `${startTime.getFullYear()}-${startTime.getMonth()}-${startTime.getDay()} · ${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
}

const getEndTime = (event) => {
    const endTime = new Date(event.endDate)
    return `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDay()} · ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
}

const anyAttending = (event) => {
    if (event?.attendees) {
        for (const attendee of event.attendees) {
            if (attendee.status === 'attending') {
                return true
            }
        }
    }
    return false
}

const anyPending = (event) => {
    if (event?.attendees) {
        for (const attendee of event.attendees) {
            if (attendee.status === 'pending') {
                return true
            }
        }
    }
    return false
}

const attendingStatus = (event, userId) => {
    if (event.attendees) {
        for (const attendee of event?.attendees) {
            if (attendee.userId === userId) {
                return attendee.status
            }
        }
        return false
    }
}

const isMember = (members, userId) => {
    if (members) {
        for (const member of members) {
            if (member.userId === userId) {
                return member.Membership.status
            }
        }
        return false
    }
}

const SingleEvent = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const event = useSelector(state => state.events.singleEvent)
    const members = useSelector(state => state.groups.singleGroup.members)
    const [attendantMenu, setAttendantMenu] = useState("attending")
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        const asyncDispatches = async () => {
            dispatch(clearGroup())
            dispatch(clearGroups())
            dispatch(fetchSingleEvent(id))
                .then(res => dispatch(fetchGroupMembers(res.groupId)))
            dispatch(fetchEventAttendees(id))
        }
        asyncDispatches()
    }, [dispatch])

    const handleJoin = async () => {
        const res = await dispatch(postEventAttendee(id))
        if (res) {
            setProcessing(false)
        }
    }

    const handleCancel = async (userId) => {
        const res = await dispatch(deleteEventAttendee(event.id, userId))
        if (res) {
            setProcessing(false)
        }
    }

    const handleApproval = async (userId) => {
        const res = await dispatch(putEventAttendee(event.id, userId, "attending", isMember(members, user.id)))
        if (res) {
            setProcessing(false)
        }
    }

    return (
        <div className='body'>
            <div className='main-top'>
                <div className='events-redirect-container'>
                    <i className="fa-solid fa-angle-left arrow" />
                    <NavLink to='/events' className='events-redirect'>Events</NavLink>
                </div>
                {Object.values(event).length ?
                    <>
                        <h2 className='event-name-top'>{event.name}</h2>
                        <h4 className='event-group-name-top'>Hosted by <NavLink to={`/groups/${event.Group.id}`} className="event-group-name-top-link" >{event.Group.name}</NavLink></h4>
                        <h4 className='event-group-type'>{event.Group.private ? "Private" : "Public"} group</h4>
                    </>
                    :
                    <>
                        <h2 className='empty-event-name empty-and-loading'></h2>
                        <h4 className='empty-event-group-name-top empty-and-loading'></h4>
                        <h4 className='empty-event-group-type empty-and-loading'></h4>
                    </>
                }
            </div>
            <div className='main-middle'>
                {Object.values(event).length ?
                    <img src={event?.EventImages[0]?.url} alt='event' className='event-img middle-left'></img>
                    :
                    <div className='empty-event-event-image empty-and-loading'></div>
                }
                <div className='middle-right'>
                    {Object.values(event).length ?
                        <NavLink to={`/groups/${event.Group.id}`} className='group-card-info'>
                            <img src={event.Group.GroupImages['0'].url} alt='group' className='group-img'></img>
                            <div className='group-info'>
                                <h4 className='group-name'>{event.Group.name}</h4>
                                <h5 className='group-status'>{event.Group.private ? 'Private' : 'Public'}</h5>
                            </div>
                        </NavLink>
                        :
                        <div className='group-card-info'>
                            <div className='empty-event-group-image empty-and-loading'></div>
                            <div className='group-info'>
                                <h4 className='empty-event-group-name empty-and-loading'></h4>
                                <h5 className='empty-event-group-status empty-and-loading'></h5>
                            </div>
                        </div>
                    }
                    <div className='event-info'>
                        <div className='times-and-dates'>
                            <i className="fa-regular fa-clock fa-2x"></i>
                            <div className='times'>
                                {Object.values(event).length ?
                                    <>
                                        <div className='start-time'>
                                            <h5 className='start-time'>Start<span className='time'>{getStartTime(event)}</span></h5>
                                        </div>
                                        <div className='end-time'>
                                            <h5 className='end-time'>End<span className='time'>{getEndTime(event)}</span></h5>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='start-time'>
                                            <h5 className='empty-event-start-time empty-and-loading'></h5>
                                        </div>
                                        <div className='end-time'>
                                            <h5 className='empty-event-end-time empty-and-loading'></h5>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='price'>
                            <i className="fa-solid fa-hand-holding-dollar fa-2x"></i>
                            {Object.values(event).length ?
                                <h4>${event.price}</h4>
                                :
                                <h4 className='empty-event-price empty-and-loading'></h4>
                            }
                        </div>
                        <div className='status'>
                            <div className='status-left'>
                                <i className="fa-solid fa-map-pin fa-2x"></i>
                                {Object.values(event).length ?
                                    <h4>{event.type}</h4>
                                    :
                                    <div className='empty-event-type empty-and-loading'></div>
                                }
                            </div>
                            {Object.values(event).length && members ?
                                (user && user?.id === event?.Organizer?.id) ?
                                    <div className={`status-right ${Object.values(event).length ? "" : "disable-clicks"}`}>
                                        <OpenModalMenuItem
                                            itemText="Delete"
                                            className='delete-event-button'
                                            modalComponent={<DeleteEventModal />}
                                        />
                                    </div> :
                                    user ?
                                        new Date(event.startDate) > Date.now() ?
                                            (event.Group.private && !isMember(members, user?.id)) ?
                                                <div>Sorry, this event is for group members only.</div>
                                                :
                                                !attendingStatus(event, user?.id) ?
                                                    event.capacity !== event.numAttending ?
                                                        <div className='event-spot-container'>
                                                            <p>{event.numAttending}/{event.capacity} spots left!</p>
                                                            <div className={`status-right join-event-button ${processing ? "disabled" : ""}`} onClick={() => {
                                                                handleJoin()
                                                                setProcessing(true)
                                                            }}>Join this event</div>
                                                        </div>
                                                        :
                                                        <div className='event-status-full'>Full capacity!</div>
                                                    :
                                                    attendingStatus(event, user.id) === 'pending' ?
                                                        <div className='attending-status-container'>
                                                            <div className='attending-status-message'>Waiting approval</div>
                                                            <div className={`attending-status-cancel ${processing ? "disabled" : ""}`} onClick={() => {
                                                                handleCancel(user.id)
                                                                setProcessing(true)
                                                            }}>Cancel</div>
                                                        </div>
                                                        :
                                                        <div className='attending-status-container'>
                                                            <div className='attending-status-message'>You're in!</div>
                                                            <div className={`attending-status-cancel ${processing ? "disabled" : ""}`} onClick={() => {
                                                                handleCancel(user.id)
                                                                setProcessing(true)
                                                            }}>Cancel</div>
                                                        </div>
                                            :
                                            <></>
                                        :
                                        <></>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-bottom'>
                <div className='event-details'>
                    <h2>Details</h2>
                    {Object.values(event).length ?
                        <p>{event.description}</p>
                        :
                        <p className='empty-event-description empty-and-loading'></p>
                    }
                </div>
                <div className='event-venue-details'>
                    <h2 className='event-venue-prompt'>
                        Venue Details
                    </h2>
                    {Object.values(event).length ?
                        <div className='event-venue-details-container'>
                            {event.type === 'In Person' ?
                                <>
                                    <i className="fa-solid fa-map-location-dot fa-2xl" />
                                    <div>
                                        <h5 className='event-venue-address'>
                                            Address: <span className='event-venue-detail-info'>{event?.Venue?.address}, {event?.Venue?.city}, {event?.Venue?.state}</span>
                                        </h5>
                                        <div className='event-venue-coordinates'>
                                            <h5 className='event-venue-lat'>
                                                Lat: <span className='event-venue-detail-info'>{event?.Venue?.lat}</span>
                                            </h5>
                                            <h5 className='event-venue-lng'>
                                                Lng: <span className='event-venue-detail-info'>{event?.Venue?.lng}</span>
                                            </h5>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <i className="fa-solid fa-map-location-dot fa-2xl" />
                                    <div>
                                        <h5 className='event-venue-address'>
                                            Address: <span className='event-venue-detail-info'>Event is online</span>
                                        </h5>
                                    </div>
                                </>
                            }
                        </div>
                        :
                        <div className='empty-event-venue-details-container empty-and-loading'>
                        </div>
                    }
                </div>
            </div>
            {(Object.values(event).length && event?.Organizer?.id === user?.id || isMember(members, user?.id) === 'co-host') ?
                <div className='event-attendants'>
                    <h2 className='event-attendants-prompt'>Attendants</h2>
                    <div className='event-attendants-list-container'>
                        <div className='event-attendants-header'>
                            <p className={attendantMenu === 'attending' ? "chosen" : ""} onClick={() => setAttendantMenu("attending")}>Attending</p>
                            <p className={attendantMenu === 'pending' ? "chosen" : ""} onClick={() => setAttendantMenu("pending")}>Pending</p>
                        </div>
                        {(attendantMenu !== 'pending') ?
                            anyAttending(event) ? event.attendees.map(attendant => {
                                if (attendant.status !== 'pending') {
                                    return (
                                        <div className='event-attendant' key={attendant.id}>
                                            <div className='event-attendant-info'>
                                                <div className='event-attendant-circle'>
                                                    <div className='event-attendant-circle-inner'>
                                                        {attendant.firstName.split("")[0]}
                                                    </div>
                                                </div>
                                                <p key={attendant.id}>{attendant?.firstName} {attendant?.lastName}</p>
                                            </div>
                                            <div className='event-attendant-options'>
                                                <div className='event-attendant-remove' onClick={() => {
                                                    handleCancel(attendant.userId)
                                                    setProcessing(true)
                                                }}>Remove</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                                :
                                <div>Looks a little empty... Approve some guests to the event!</div>
                            :
                            anyPending(event) ? event.attendees.map(attendant => {
                                if (attendant.status === 'pending') {
                                    return (
                                        <div className='event-attendant' key={attendant.id}>
                                            <div className='event-attendant-info'>
                                                <div className='event-attendant-circle'>
                                                    <div className='event-attendant-circle-inner'>
                                                        {attendant.firstName.split("")[0]}
                                                    </div>
                                                </div>
                                                <p key={attendant.id}>{attendant?.firstName} {attendant?.lastName}</p>
                                            </div>
                                            <div className='event-attendant-options'>
                                                <div className='event-attendant-approve' onClick={() => {
                                                    handleApproval(attendant.userId)
                                                    setProcessing(true)
                                                }}>Approve</div>
                                                <div className='event-attendant-remove' onClick={() => {
                                                    handleCancel(attendant.userId)
                                                    setProcessing(true)
                                                }}>Remove</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                                :
                                <div className='no-pending-request-message'>No pending requests.</div>
                        }
                    </div>
                </div>
                :
                <div className='event-attendants'></div>
            }
        </div>
    )
}

export default SingleEvent
