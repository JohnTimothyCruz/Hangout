import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Events.css';
import { useEffect } from "react";
import { fetchEvents } from "../../store/eventReducer";

const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events)

    useEffect(() => {
        dispatch(fetchEvents())
    }, []);

    if (!events) return null;

    return (
        <div className="main-page">
            <div className="menu">
                <div>
                    <NavLink to='/events' className='link current'>
                        Events
                    </NavLink>
                    <NavLink to='/groups' className='link unselected'>
                        Groups
                    </NavLink>
                </div>
                <h4 className="title">Events in Meetup</h4>
            </div>
            {
                Object.values(events).map(event => {
                    return (
                        <div>
                            a
                        </div>
                    )
                })
            }
        </div>
    )
};

export default EventList
