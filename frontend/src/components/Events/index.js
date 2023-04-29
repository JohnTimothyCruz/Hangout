import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { clearEvent, fetchEvents } from "../../store/eventReducer";
import './Events.css';

const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.allEvents)
    let futureEvents;

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchEvents())
        dispatch(clearEvent())
    }, []);

    const compareFn = (a, b) => {
        if (new Date(a.startDate) > new Date(b.startDate)) return -1;
        if (new Date(a.startDate) < new Date(b.startDate)) return 1;
        if (new Date(a.startDate) === new Date(b.startDate)) return 0
    }

    const allUpcomingEvents = (eventsObj) => {
        const now = Date.now();
        const allEvents = Object.values(eventsObj);
        const upcoming = [];

        allEvents.forEach(event => {
            const end = new Date(event.startDate)
            if (end > now) {
                upcoming.push(event)
            }
        })

        const sortedUpcoming = upcoming.sort(compareFn)
        return sortedUpcoming;
    }

    if (Object.values(events).length) {
        futureEvents = allUpcomingEvents(events);
    } else {
        futureEvents = [];
    }

    return (
        <div className="main-page">
            <div className="menu">
                <NavLink to='/events' className='current'>
                    Events
                </NavLink>
                <NavLink to='/groups' className='unselected'>
                    Groups
                </NavLink>
                <h4 className="title">Events in Hangout</h4>
            </div>
            {Object.values(futureEvents).map((event) => {
                const time = new Date(event.startDate)
                let url;
                if (event?.EventImages[0]) {
                    url = event.EventImages[0].url
                }

                return (
                    <div className="event-container" key={event.id}>
                        <NavLink to={`/events/${event.id}`} className="event-card">
                            <div className="card-top">
                                <img src={url} alt='event' className="event-image card-top-left"></img>
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
                        </NavLink>
                    </div>
                )
            })
            }
            {Object.values(events).length !== 0 &&
                <>
                    <div className="no-more-events-message">
                        <i className="fa-solid fa-face-grin-beam-sweat fa-2xl" />
                        <p>Looks like there are no more upcoming events to join... Why not make one?</p>
                    </div>
                    <div className="takes-space-bottom"></div>
                </>
            }
        </div>
    )
};

export default EventList
