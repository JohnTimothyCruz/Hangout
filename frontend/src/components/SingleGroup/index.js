import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { fetchGroup } from '../../store/groupReducer'
import DeleteGroupModal from '../DeleteGroupModal'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import './SingleGroup.css'

const compareFn = (a, b) => {
    if (new Date(a.startDate) > new Date(b.startDate)) return -1;
    if (new Date(a.startDate) < new Date(b.startDate)) return 1;
    if (new Date(a.startDate) === new Date(b.startDate)) return 0
}

const allUpcomingEvents = (group) => {
    const now = Date.now();
    console.log('Here in allUpcomingEvents func, group: ', group)
    const allEvents = group.Events;
    console.log('Here in allUpcomingEvents func, allEvents: ', allEvents)
    if (allEvents === undefined) return {};

    const upcoming = [];

    Object.values(allEvents).forEach(event => {
        const end = new Date(event.endDate)
        if (end > now) {
            upcoming.push(event)
        }
    })

    const sortedUpcoming = upcoming.sort(compareFn)
    return sortedUpcoming;
}

const allPastEvents = (group) => {
    const now = Date.now();
    const allEvents = group.Events;

    if (allEvents === undefined) return {};

    const past = [];

    Object.values(allEvents).forEach(events => {
        const end = new Date(events.endDate)
        if (end < now) {
            past.push(events)
        }
    })

    const sortedPast = past.sort(compareFn)
    return sortedPast;
}

const getStartTime = (event) => {
    const startTime = new Date(event.startDate)
    return `${startTime.getFullYear()}-${startTime.getMonth()}-${startTime.getDay()} · ${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
}

const onClick = () => {
    alert("Feature Coming Soon...")
}

const SingleGroup = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const state = useSelector(state => state)
    const group = state.groups.singleGroup
    console.log(group)
    const user = state.session.user
    console.log(user)

    useEffect(() => {
        dispatch(fetchGroup(id))
    }, [])

    // if (group !== undefined && group !== null && Object.values(group).length) {
    if (group === undefined || group === null || !Object.values(group).length) return null;

    const organizerCreateButtonHandler = () => {
        history.push(`/groups/${id}/events/new`)
    }

    const organizerUpdateButtonHandler = () => {
        history.push(`/group/${id}/edit`)
    }

    const upcomingEvents = allUpcomingEvents(group);
    const pastEvents = allPastEvents(group);

    let anyUpcoming = false;
    Object.values(upcomingEvents).length ? anyUpcoming = true : anyUpcoming = false;

    let anyPast = false;
    Object.values(pastEvents).length ? anyPast = true : anyPast = false;

    return (
        <div className='group-body'>
            <div className='group-main-top'>
                <div className='group-groups-redirect-container'>
                    <h4 className='group-arrow'>{'<'}</h4>
                    <NavLink to='/groups' className='group-groups-redirect'>Groups</NavLink>
                </div>
                <div className='group-main-middle'>
                    <img src={group.GroupImages['0'].url} className='group-middle-left'></img>
                    <div className='group-middle-right'>
                        <div className='group-middle-right-top'>
                            <h2 className='group-name'>{group.name}</h2>
                            <div className='group-group-details'>
                                <h4>{group.city}, {group.state}</h4>
                                <h4>{Object.values(group.Events).length} events · {group.private ? 'Private' : 'Public'}</h4>
                                <h4>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</h4>
                            </div>
                        </div>
                        <div className='group-middle-right-bottom'>
                            {
                                (user && user.id === group.Organizer.id) ?
                                    <div className='group-button-container'>
                                        <div className='group-create-event-button' onClick={organizerCreateButtonHandler}>Create event</div>
                                        <div className='group-update-event-button' onClick={organizerUpdateButtonHandler}>Update</div>
                                        <OpenModalMenuItem
                                            className='group-delete-event-button'
                                            itemText="Delete"
                                            modalComponent={<DeleteGroupModal />}
                                        />
                                    </div> :
                                    <div className='group-join-button' onClick={onClick}>Join this group</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='group-main-bottom'>
                <div className='group-organizer'>
                    <h2>Organizer</h2>
                    <h5>{group.Organizer.firstName} {group.Organizer.lastName}</h5>
                </div>
                <div className='group-about'>
                    <h2>What we're about</h2>
                    <p>{group.about}</p>
                </div>
                <div className='group-no-events'>
                    {
                        (!anyPast && !anyUpcoming) && <h2>No Upcoming Events</h2>
                    }
                </div>
                <div className={`group-upcoming-events ${anyUpcoming ? '' : 'hidden'}`}>
                    <h2 className={anyUpcoming ? '' : 'hidden'}>Upcoming Events ({upcomingEvents.length})</h2>
                    {
                        anyUpcoming && upcomingEvents.map((event, idx) => {
                            return (
                                <div className='group-event-card'>
                                    <NavLink to={`/events/${event.id}`} key={idx} className='group-event-link'>
                                        <div className='group-event-card-top'>
                                            <img src={event.url} className='group-card-top-left'></img>
                                            <div className='group-card-top-left'>
                                                <h4 className='group-card-time'>{getStartTime(event)}</h4>
                                                <h3 className='group-card-title'>{event.name}</h3>
                                                <h4 className='group-card-location'>{event.Venue.city}, {event.Venue.state}</h4>
                                            </div>
                                        </div>
                                        <div className='group-event-card-description'>{event.description}</div>
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`group-past-events ${anyUpcoming ? '' : 'hidden'}`}>
                    <h2 className={anyPast ? '' : 'hidden'}>Past Events ({pastEvents.length})</h2>
                    {
                        anyPast && pastEvents.map((event, idx) => {
                            return (
                                <div className='group-event-card'>
                                    <NavLink to={`/events/${event.id}`} key={idx} className='group-event-link'>
                                        <div className='group-event-card-top'>
                                            <img src={event.url} className='group-card-top-left'></img>
                                            <div className='group-card-top-left'>
                                                <h4 className='group-card-time'>{getStartTime(event)}</h4>
                                                <h3 className='group-card-title'>{event.name}</h3>
                                                <h4 className='group-card-location'>{event.Venue.city}, {event.Venue.state}</h4>
                                            </div>
                                        </div>
                                        <div className='group-event-card-description'>{event.description}</div>
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default SingleGroup
