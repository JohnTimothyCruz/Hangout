import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useEffect } from "react"
import { fetchEvents } from "../../store/eventReducer"
import { fetchGroups } from "../../store/groupReducer"
import "./ProfilePage.css"

const ProfilePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const state = useSelector(state => state)
    const user = state.session.user

    // Hard coded numbers

    useEffect(() => {
        dispatch(fetchEvents())
        dispatch(fetchGroups())
    }, [dispatch])

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
                    <p className="profile-page-user-stat-number">0</p>
                    <p>Groups</p>
                </div>
                <div className="profile-page-user-stat">
                    <p className="profile-page-user-stat-number">0</p>
                    <p>Events</p>
                </div>
            </div>
            <div className="profile-page-groups">
                <h2 className="profile-page-groups-title">Groups</h2>
                <div className="profile-page-empty-groups">
                    <img src="https://secure.meetupstatic.com/next/images/home/EmptyGroup.svg?w=256" />
                    <h3 className="profile-page-empty-groups-title">No groups joined</h3>
                    <p className="profile-page-empty-groups-text">All groups you join and organize will be shown here.</p>
                    <div className="profile-find-groups-button" onClick={() => history.push("/groups")}>Find Groups</div>
                </div>
            </div>
            <div className="profile-page-events">
                <h2 className="profile-page-events-title">Upcoming Events</h2>
                <div className="profile-page-empty-events">
                    <img src="https://secure.meetupstatic.com/next/images/shared/Interests.svg?w=128" />
                    <h3 className="profile-page-empty-events-title">No upcoming events</h3>
                    <p className="profile-page-empty-events-text">All upcoming events you join will be shown here.</p>
                    <div className="profile-find-events-button" onClick={() => history.push("/events")}>Find Events</div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
