import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { clearGroup, fetchGroups } from "../../store/groupReducer";
import './Groups.css'

const GroupList = () => {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.allGroups)

    useEffect(() => {
        dispatch(fetchGroups())
        dispatch(clearGroup())
    }, []);

    const findPreviewImg = (groupImages) => {
        for (const image of groupImages) {
            if (image?.preview) {
                return image
            }
        }
    }

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
            {Object.values(groups) && Object.values(groups).map((group) => (
                <div className="group-container" key={group?.id}>
                    <NavLink to={`/groups/${group.id}`} className="group-card">
                        <img src={findPreviewImg(group.GroupImages).url} alt='group' className='group-image card-left'></img>
                        <div className="card-right">
                            <h2 className="group-name">{group.name}</h2>
                            <h4 className="group-location">{group.city}, {group.state}</h4>
                            <h4 className="group-about">{group.about}</h4>
                            <div className="group-details">{group.Events.length} events · {group.private ? 'Private' : 'Public'}</div>
                        </div>
                    </NavLink>
                </div>
            ))
            }
            {Object.values(groups).length !== 0 &&
                <div className="no-more-groups-message">
                    <i className="fa-solid fa-face-grin-beam-sweat fa-2xl" />
                    <p>Looks like there are no more groups to join... Why not make one?</p>
                </div>
            }
            <div className="takes-space-bottom"></div>
        </div>
    )
}

export default GroupList
