import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { clearEvent, fetchEvents } from "../../store/eventReducer";
import './Events.css';

const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.allEvents)

    useEffect(() => {
        dispatch(fetchEvents())
        dispatch(clearEvent())
    }, []);

    if (!Object.values(events).length || events === undefined) return null;

    return (
        <div className="main-page">
            <div className="menu">
                <NavLink to='/events' className='current'>
                    Events
                </NavLink>
                <NavLink to='/groups' className='unselected'>
                    Groups
                </NavLink>
                <h4 className="title">Events in Meetup</h4>
            </div>
            {
                Object.values(events).map((event, idx) => {
                    const time = new Date(event.startDate)
                    let url;
                    if (event?.EventImages[0]) {
                        url = event.EventImages[0].url
                    }

                    return (
                        <div className="event-container" key={idx}>
                            <NavLink to={`/events/${event.id}`} className="event-card">
                                <div className="card-top">
                                    <img src={url} alt='event' className="event-image card-top-left"></img>
                                    <div className="card-top-right">
                                        <h5 className="event-time">
                                            {time.getFullYear()}-{time.getMonth()}-{time.getDay()} · {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </h5>
                                        <h4 className="event-name">
                                            {event.name}
                                        </h4>
                                        <h4 className="event-location">
                                            {event.Venue.city} · {event.Venue.state}
                                        </h4>
                                    </div>
                                </div>
                                <div className="card-bottom">
                                    <div className="event-description">
                                        {event.description}
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default EventList
