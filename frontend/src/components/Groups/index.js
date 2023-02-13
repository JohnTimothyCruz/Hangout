import { NavLink } from "react-router-dom"
import './Groups.css'

const GroupList = () => {
    return (
        <div className="main-page">
            <div className="menu">
                <NavLink to='/events' className='unselected'>
                    Events
                </NavLink>
                <NavLink to='/groups' className='current'>
                    Groups
                </NavLink>
                <h4 className="title">Groups in Meetup</h4>
            </div>
        </div>
    )
}

export default GroupList
