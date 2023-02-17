import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { fetchGroups } from "../../store/groupReducer";
import './Groups.css'

const GroupList = () => {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.allGroups)

    useEffect(() => {
        dispatch(fetchGroups())
    }, []);

    if (groups === undefined || groups === null || !Object.values(groups).length) return null;

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
            {
                Object.values(groups).map((group, idx) => {
                    const url = group.GroupImages[0].url

                    return (
                        <div className="group-container" key={idx}>
                            <NavLink to={`/groups/${group.id}`} className="group-card">
                                <img src={url} alt='group' className='group-image card-left'></img>
                                <div className="card-right">
                                    <h2 className="group-name">{group.name}</h2>
                                    <h4 className="group-location">{group.city}, {group.state}</h4>
                                    <h4 className="group-about">{group.about}</h4>
                                    <h5 className="group-details">{group.Events.length} events · {group.private ? 'Private' : 'Public'}</h5>
                                </div>
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GroupList
