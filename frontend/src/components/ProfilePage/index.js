import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useEffect } from "react"
import { clearEvent, fetchEvents } from "../../store/eventReducer"
import { clearGroup, fetchGroups } from "../../store/groupReducer"
import "./ProfilePage.css"

const ProfilePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const state = useSelector(state => state)
    const user = state.session.user
    const allGroups = state.groups.allGroups
    const allEvents = state.events.allEvents

    const findPreviewImg = (groupImages) => {
        for (const image of groupImages) {
            if (image?.preview) {
                return image
            }
        }
    }

    const getUserRelatedGroups = () => {
        const groups = [];

        if (Object.values(allGroups).length) {
            for (const group of Object.values(allGroups)) {
                for (const member of group?.members) {
                    if (member?.userId === user?.id) {
                        groups.push(group)
                    }
                }
            }
        }

        return groups;
    }

    const getUserRelatedEvents = () => {
        const events = [];

        if (Object.values(allEvents).length) {
            for (const event of Object.values(allEvents)) {
                if (new Date(event?.endDate) > Date.now()) {
                    for (const attendee of event?.attendees) {
                        if (attendee?.userId === user?.id) {
                            events.push(event)
                        }
                    }
                }
            }
        }

        return events;
    }

    useEffect(() => {
        dispatch(fetchEvents())
        dispatch(fetchGroups())
        dispatch(clearEvent())
        dispatch(clearGroup())
    }, [dispatch])

    console.log(getUserRelatedEvents(), getUserRelatedGroups())

    return (
        <div className="profile-page">
            <div className="profile-page-top">
                <div className="profile-page-top-left">
                    <div className="profile-page-top-left-inner">
                        {user?.username.split("")[0]}
                    </div>
                </div>
                <div className="profile-page-top-right">
                    <h1 className="profile-page-username">{user?.username}</h1>
                </div>
            </div>
            <div className="profile-page-user-stats">
                <div className="profile-page-user-stat">
                    <p className="profile-page-user-stat-number">{getUserRelatedGroups().length}</p>
                    <p>Groups</p>
                </div>
                <div className="profile-page-user-stat">
                    <p className="profile-page-user-stat-number">{getUserRelatedEvents().length}</p>
                    <p>Events</p>
                </div>
            </div>
            <div className="profile-page-groups">
                <h2 className="profile-page-groups-title">Groups</h2>
                {getUserRelatedGroups().length ?
                    <div className="profile-page-user-groups-container">
                        {getUserRelatedGroups().map(group => (
                            <div className="profile-group" onClick={() => history.push(`/groups/${group?.id}`)}>
                                <img src={findPreviewImg(group.GroupImages).url} alt='group' className='group-image card-left' />
                                <div className="card-right">
                                    <h2 className="group-name">{group.name}</h2>
                                    <h4 className="group-location">{group.city}, {group.state}</h4>
                                    <h4 className="group-about">{group.about}</h4>
                                    <div className="group-details">{group.Events.length} events · {group.private ? 'Private' : 'Public'}</div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    :
                    <div className="profile-page-empty-groups">
                        <img src="https://secure.meetupstatic.com/next/images/home/EmptyGroup.svg?w=256" />
                        <h3 className="profile-page-empty-groups-title">No groups joined</h3>
                        <p className="profile-page-empty-groups-text">All groups you join and organize will be shown here.</p>
                        <div className="profile-find-groups-button" onClick={() => history.push("/groups")}>Find Groups</div>
                    </div>
                }
            </div>
            <div className="profile-page-events">
                <h2 className="profile-page-events-title">Upcoming Events</h2>
                {getUserRelatedEvents().length ?
                    <div className="profile-page-user-events-container">
                        {getUserRelatedEvents().map(event => {
                            let time = new Date(event.startDate)
                            return (
                                <div className="profile-event" onClick={() => history.push(`/events/${event?.id}`)}>
                                    <div className="card-top">
                                        <img src={event.EventImages[0].url} alt='event' className="event-image card-top-left"></img>
                                        <div className="card-top-right">
                                            <div>
                                                <h5 className="event-time">
                                                    {time.getFullYear()}-{time.getMonth()}-{time.getDay()} · {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </h5>
                                                <h4 className="event-name">
                                                    {event.name}
                                                </h4>
                                                <h4 className="event-location">
                                                    {event.Group.name} · {event.Venue.city}, {event.Venue.state}
                                                </h4>
                                            </div>
                                            <div className="event-description">
                                                {event.numAttending} attendents · <span className="event-spots-left">{event.capacity - event.numAttending} spots left</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    :
                    <div className="profile-page-empty-events">
                        <img src="https://secure.meetupstatic.com/next/images/shared/Interests.svg?w=128" />
                        <h3 className="profile-page-empty-events-title">No upcoming events</h3>
                        <p className="profile-page-empty-events-text">All upcoming events you join will be shown here.</p>
                        <div className="profile-find-events-button" onClick={() => history.push("/events")}>Find Events</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfilePage
