import { NavLink } from "react-router-dom"
import './Groups.css'

const GroupList = () => {
    return (
        <div className="main-page">
            <div className="menu">
                <NavLink to='/events' className='link unselected'>
                    Events
                </NavLink>
                <NavLink to='/groups' className='link current'>
                    Groups
                </NavLink>
            </div>
            <h4 className="title">Groups in Meetup</h4>
        </div>
    )
}

export default GroupList
