import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { fetchGroup } from '../../store/groupReducer'
import './SingleGroup.css'

const allUpcomingEvents = (group) => {
    const now = Date.now();
    const allEvents = group.Events;

    const upcoming = [];

    Object.values(allEvents).forEach(event => {
        const end = new Date(event.endDate)
        if (end > now) {
            upcoming.push(event)
        }
    })

    return upcoming;
}

const allPastEvents = (group) => {
    const now = Date.now();
    const allEvents = group.Events;

    const past = [];

    Object.values(allEvents).forEach(events => {
        const end = new Date(events.endDate)
        if (end < now) {
            past.push(events)
        }
    })

    return past;
}

const SingleGroup = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const group = useSelector(state => state.groups.singleGroup)

    useEffect(() => {
        dispatch(fetchGroup(id))
    }, [])

    if (group === undefined || !Object.values(group).length) return null

    const upcomingEvents = allUpcomingEvents(group);
    const pastEvents = allPastEvents(group);

    return (
        <div className='body'>
            <div className='main-top'>
                <div className='groups-redirect-container'>
                    <h4 className='arrow'>{'<'}</h4>
                    <NavLink to='/groups' className='groups-redirect'>Groups</NavLink>
                </div>
            </div>
            <div className='main-middle'>
                <img src={group.GroupImages['0'].url} className='middle-left'></img>
                <div className='middle-right'>
                    <div className='middle-right-top'>
                        <h2 className='organizer-name'>{group.name}</h2>
                        <div className='group-details'>
                            <h4>{group.city}, {group.state}</h4>
                            <h4>{Object.values(group.Events).length} events · {group.private ? 'Private' : 'Public'}</h4>
                            <h4>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</h4>
                        </div>
                    </div>
                    <div className='middle-right-bottom'>
                        <div className='join-button'>Join this group</div>
                    </div>
                </div>
            </div>
            <div className='main-bottom'>
                <div className='organizer'>
                    <h2>Organizer</h2>
                    <h5>{group.Organizer.firstName} {group.Organizer.lastName}</h5>
                </div>
                <div className='about'>
                    <h2>What we're about</h2>
                    <p>{group.about}</p>
                </div>
                <div className='upcoming-events'>
                    <h2>Upcoming Events ({upcomingEvents.length})</h2>
                    {
                        upcomingEvents.map((event, idx) => {
                            return (<div key={idx} className='event-card'>
                                <div className='event-card-top'>
                                    <img src={event.url}></img>
                                </div>
                                <div className='event-card-description'>{event.description}</div>
                            </div>)
                        })
                    }
                </div>
                <div className='past-events'>
                    <h2>Past Events ({pastEvents.length})</h2>
                </div>
            </div>
        </div>
    )
}

export default SingleGroup
