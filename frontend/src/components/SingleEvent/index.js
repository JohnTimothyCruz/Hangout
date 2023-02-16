import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { fetchSingleEvent } from '../../store/eventReducer'
import './SingleEvent.css'

const getStartTime = (event) => {
    const startTime = new Date(event.startDate)
    return `${startTime.getFullYear()}-${startTime.getMonth()}-${startTime.getDay()} · ${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
}

const getEndTime = (event) => {
    const endTime = new Date(event.endDate)
    return `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDay()} · ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
}

const SingleEvent = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const event = useSelector(state => state.events.singleEvent)

    useEffect(() => {
        dispatch(fetchSingleEvent(id));
    }, [])

    console.log('Here in singleEvent component: ', event)
    if (event === undefined || event === null || !Object.values(event).length) return null;

    return (
        <div className='body'>
            <div className='main-top'>
                <div className='events-redirect-container'>
                    <h4 className='arrow'>{'<'}</h4>
                    <NavLink to='/events' className='events-redirect'>Events</NavLink>
                </div>
                <h2>{event.name}</h2>
                <h4 className='organizer'>Hosted by {event.organizer.firstName} {event.organizer.firstName}</h4>
            </div>
            <div className='main-middle'>
                <img src={event.EventImages[0].url} className='event-img middle-left'></img>
                <div className='middle-right'>
                    <NavLink to={`/groups/${event.Group.id}`} className='group-card-info'>
                        <img src={event.Group.GroupImages['0'].url} className='group-img'></img>
                        <div className='group-info'>
                            <h4 className='group-name'>{event.Group.name}</h4>
                            <h5 className='group-status'>{event.Group.private ? 'Private' : 'Public'}</h5>
                        </div>
                    </NavLink>
                    <div className='event-info'>
                        <div className='times-and-dates'>
                            <i className="fa-regular fa-clock fa-2x"></i>
                            <div className='times'>
                                <div className='start-time'>
                                    <h5 className='start-time'>Start<span className='time'>{getStartTime(event)}</span></h5>
                                </div>
                                <div className='end-time'>
                                    <h5 className='end-time'>End<span className='time'>{getEndTime(event)}</span></h5>
                                </div>
                            </div>
                        </div>
                        <div className='price'>
                            <i className="fa-solid fa-hand-holding-dollar fa-2x"></i>
                            <h4>${event.price}</h4>
                        </div>
                        <div className='status'>
                            <i className="fa-solid fa-map-pin fa-2x"></i>
                            <h4>{event.type}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-bottom'>
                <div className='event-details'>
                    <h2>Details</h2>
                    <p>{event.description}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleEvent
