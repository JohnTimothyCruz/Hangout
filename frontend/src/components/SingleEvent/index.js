import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { fetchSingleEvent } from '../../store/eventReducer'
import DeleteEventModal from '../DeleteEventModal'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import './SingleEvent.css'
import { clearGroup } from '../../store/groupReducer'

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
    const user = useSelector(state => state.session.user)
    const event = useSelector(state => state.events.singleEvent)

    useEffect(() => {
        dispatch(fetchSingleEvent(id));
        dispatch(clearGroup())
    }, [])

    const handleJoin = () => {
        window.alert('Feature coming soon...')
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
                            {Object.values(event).length ?
                                (user && user?.id === event?.Organizer?.id) ?
                                    <div className={`status-right ${Object.values(event).length ? "" : "disable-clicks"}`}>
                                        <OpenModalMenuItem
                                            itemText="Delete"
                                            className='delete-event-button'
                                            modalComponent={<DeleteEventModal />}
                                        />
                                    </div> :
                                    <div className='status-right join-event-button' onClick={handleJoin}>Join this event</div>
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
            </div>
        </div>
    )
}

export default SingleEvent
