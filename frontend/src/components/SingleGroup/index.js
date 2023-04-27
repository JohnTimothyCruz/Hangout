import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { fetchGroup, fetchGroupMembers, postGroupMember } from '../../store/groupReducer'
import DeleteGroupModal from '../DeleteGroupModal'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import './SingleGroup.css'
import { clearEvent, clearEvents } from '../../store/eventReducer'
import CreateGroupImageModal from '../CreateGroupImageModal'
import SingleGroupImage from '../SingleGroupImage'
import SingleGroupMember from '../SingleGroupMember'

const compareFn = (a, b) => {
    if (new Date(a.startDate) > new Date(b.startDate)) return -1;
    if (new Date(a.startDate) < new Date(b.startDate)) return 1;
    if (new Date(a.startDate) === new Date(b.startDate)) return 0
}

const allUpcomingEvents = (group) => {
    const now = Date.now();
    const allEvents = group.Events;

    if (allEvents === undefined) return {};

    const upcoming = [];

    Object.values(allEvents).forEach(event => {
        const end = new Date(event.startDate)
        if (end > now) {
            upcoming.push(event)
        }
    })

    const sortedUpcoming = upcoming.sort(compareFn)
    return sortedUpcoming;
}

const allPastEvents = (group) => {
    const now = Date.now();
    const allEvents = group.Events;

    if (allEvents === undefined) return {};

    const past = [];

    Object.values(allEvents).forEach(events => {
        const end = new Date(events.startDate)
        if (end < now) {
            past.push(events)
        }
    })

    const sortedPast = past.sort(compareFn)
    return sortedPast;
}

const getStartTime = (event) => {
    const startTime = new Date(event.startDate)
    return `${startTime.getFullYear()}-${startTime.getMonth()}-${startTime.getDay()} · ${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
}

const findPreviewImg = (groupImages) => {
    for (const image of groupImages) {
        if (image?.preview) {
            return image
        }
    }
}

const isMember = (members, userId) => {
    for (const member of members) {
        if (member.userId === userId) {
            return true
        }
    }
    return false
}

const SingleGroup = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const state = useSelector(state => state)
    const [chosenMenuOption, setChosenMenuOption] = useState('about')
    const [chosenMemberMenuOption, setChosenMemberMenuOption] = useState('members')
    const group = state.groups.singleGroup
    const user = state.session.user

    useEffect(() => {
        dispatch(fetchGroup(id))
        dispatch(clearEvent())
        dispatch(clearEvents())
        dispatch(fetchGroupMembers(id))
    }, [dispatch])

    let upcomingEvents = false;
    let pastEvents = false;
    let anyUpcoming = false;
    let anyPast = false;

    if (Object.values(group)) {
        upcomingEvents = allUpcomingEvents(group);
        pastEvents = allPastEvents(group);

        if (Object.values(upcomingEvents).length) anyUpcoming = true;
        if (Object.values(pastEvents).length) anyPast = true;
    }

    const handleGroupJoin = (groupId) => {
        dispatch(postGroupMember(groupId))
    }

    return (
        <div className='group-body'>
            <div className='group-main-top'>
                <div className='group-groups-redirect-container'>
                    <i className="fa-solid fa-angle-left group-arrow" />
                    {Object.values(group).length > 1 ?
                        <NavLink to='/groups' className='group-groups-redirect'>Back to Groups</NavLink>
                        :
                        <div to='/groups' className='group-groups-redirect'>Back to Groups</div>
                    }
                </div>
                <div className='group-main-middle'>
                    {Object.values(group).length > 1 ?
                        <img src={findPreviewImg(group?.GroupImages)?.url} alt='group' className='group-middle-left SingleGroup-group-image'></img>
                        :
                        <div className='empty-group-image empty-and-loading'></div>
                    }
                    <div className='group-middle-right'>
                        <div className='group-middle-right-top'>
                            {Object.values(group).length > 1 ?
                                <h2 className='group-name'>{group.name}</h2>
                                :
                                <h2 className='empty-group-name empty-and-loading'></h2>
                            }
                            <div className='group-group-details'>
                                {Object.values(group).length > 1 ?
                                    <>
                                        <div>
                                            <i className="fa-solid fa-location-dot" />
                                            <h4>{group.city}, {group.state}</h4>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-users" />
                                            <h4>{Object.values(group.Events).length} events · {group.private ? 'Private' : 'Public'}</h4>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-user" />
                                            <h4>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</h4>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h4 className='empty-group-location empty-and-loading'></h4>
                                        <h4 className='empty-group-events-count empty-and-loading'></h4>
                                        <h4 className='empty-group-organizer empty-and-loading'></h4>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='group-middle-right-bottom'>
                            {Object.values(group).length > 1 ?
                                (user && user?.id === group?.Organizer?.id) ?
                                    <div className='group-button-container'>
                                        <NavLink to={`/groups/${id}/events/new`} className='group-create-event-button'>Create event</NavLink>
                                        <NavLink to={`/groups/${id}/edit`} className='group-update-event-button'>Update</NavLink>
                                        <OpenModalMenuItem
                                            className='group-delete-event-button'
                                            itemText="Delete"
                                            modalComponent={<DeleteGroupModal />}
                                        />
                                    </div> :
                                    isMember(group?.members, user?.id) ?
                                        <></>
                                        :
                                        <div className='group-join-button' onClick={() => handleGroupJoin(group?.id)}>Join this group</div>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='single-group-menu'>
                <div className={`single-group-menu-option ${chosenMenuOption === 'about' ? "selected" : ""}`} onClick={() => setChosenMenuOption("about")}>
                    About
                </div>
                <div className={`single-group-menu-option ${chosenMenuOption === 'photos' ? "selected" : ""}`} onClick={() => setChosenMenuOption("photos")}>
                    Photos
                </div>
                <div className={`single-group-menu-option ${chosenMenuOption === 'members' ? "selected" : ""}`} onClick={() => setChosenMenuOption("members")}>
                    Members
                </div>
            </div>
            {chosenMenuOption === "about" ?
                <div className='group-main-bottom'>
                    <div className='group-main-bottom-info'>
                        <div className='group-about'>
                            <h2>What we're about</h2>
                            {Object.values(group).length > 1 ?
                                <p>{group.about}</p>
                                :
                                <p className='empty-group-about empty-and-loading'></p>
                            }
                        </div>
                        <div className='group-organizer'>
                            <h2>Organizer</h2>
                            {Object.values(group).length > 1 ?
                                <div className='group-organizer-section'>
                                    <div className='group-organizer-circle'>
                                        <div className='group-organizer-circle-inner'>
                                            {group.Organizer.firstName.split("")[0]}
                                        </div>
                                    </div>
                                    <h5>{group.Organizer.firstName} {group.Organizer.lastName}</h5>
                                </div>
                                :
                                <h5 className='empty-group-organizer-small empty-and-loading'></h5>
                            }
                        </div>
                    </div>
                    {Object.values(group).length > 1 ?
                        (!anyPast && !anyUpcoming) &&
                        <div className='group-no-events'>
                            <h2>No Upcoming Events</h2>
                            <p>...for now...</p>
                        </div>
                        :
                        <></>
                    }
                    <div className={`group-upcoming-events ${anyUpcoming ? '' : 'hidden'}`}>
                        <h2 className={anyUpcoming ? '' : 'hidden'}>Upcoming Events ({upcomingEvents?.length})</h2>
                        {
                            anyUpcoming && upcomingEvents.map((event) => {
                                return (
                                    <div className='group-event-card' key={event?.id}>
                                        <NavLink to={`/events/${event.id}`} className='group-event-link'>
                                            <div className='group-event-card-top'>
                                                <img src={event.url} alt='event' className='group-card-top-left SingleGroup-event-image'></img>
                                                <div className='group-card-top-left'>
                                                    <h4 className='group-card-time'>{getStartTime(event)}</h4>
                                                    <h3 className='group-card-title'>{event.name}</h3>
                                                    <h4 className='group-card-location'>{event.Venue.city}, {event.Venue.state}</h4>
                                                </div>
                                            </div>
                                            <div className='group-event-card-description'>{event.description}</div>
                                        </NavLink>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={`group-past-events ${anyPast ? '' : 'hidden'}`}>
                        <h2 className={anyPast ? '' : 'hidden'}>Past Events ({pastEvents?.length})</h2>
                        {
                            anyPast && pastEvents.map((event) => {
                                return (
                                    <div className='group-event-card' key={event?.id}>
                                        <NavLink to={`/events/${event.id}`} className='group-event-link'>
                                            <div className='group-event-card-top'>
                                                <img src={event.url} alt='event' className='group-card-top-left SingleGroup-event-image'></img>
                                                <div className='group-card-top-left'>
                                                    <h4 className='group-card-time'>{getStartTime(event)}</h4>
                                                    <h3 className='group-card-title'>{event.name}</h3>
                                                    <h4 className='group-card-location'>{event.Venue.city}, {event.Venue.state}</h4>
                                                </div>
                                            </div>
                                            <div className='group-event-card-description'>{event.description}</div>
                                        </NavLink>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                :
                chosenMenuOption === 'photos' ?
                    <div className='group-main-bottom'>
                        <div className='group-pictures'>
                            <div className='group-pictures-header'>
                                <h2>
                                    Photos ({group?.GroupImages?.length - 1})
                                </h2>
                                {user?.id === group?.organizerId &&
                                    <OpenModalMenuItem
                                        className='add-group-photo-button'
                                        itemText="Add Photo"
                                        modalComponent={<CreateGroupImageModal props={[id, group?.name]} />}
                                    />
                                }
                            </div>
                            <div className='group-pictures-images-container'>
                                {Object.values(group?.GroupImages).length > 1 ?
                                    group.GroupImages.map(image => {
                                        if (image?.id !== findPreviewImg(group?.GroupImages)?.id) {
                                            return (
                                                <SingleGroupImage props={[image, user?.id, group.organizerId]} key={image.id} />
                                            )
                                        }
                                    })
                                    :
                                    <p className='group-images-image-empty-message'>
                                        {user?.id === group?.organizerId ?
                                            "There are no photos... yet. Why not post some memories?"
                                            :
                                            "There are no photos... yet. Ask the organizer to post some memories!"
                                        }
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className='group-main-bottom'>
                        <h2 className='group-members-section-title'>Members</h2>
                        <div className='group-members'>
                            <div className='group-members-header'>
                                <p className={chosenMemberMenuOption === 'members' ? 'chosen' : ''} onClick={() => setChosenMemberMenuOption('members')}>Members</p>
                                <p className={chosenMemberMenuOption === 'pending' ? 'chosen' : ''} onClick={() => setChosenMemberMenuOption('pending')}>Pending</p>
                            </div>
                            {chosenMemberMenuOption !== 'pending' ?
                                <div className='group-members-member-container'>
                                    {group?.members && group.members.map(member => {
                                        if (member.Membership.status !== 'pending') {
                                            return (
                                                <SingleGroupMember props={[member, user, member.Membership.status]} key={member.id} />
                                            )
                                        }
                                    })}
                                </div>
                                :
                                <div className='group-members-member-container'>
                                    {group?.members && group.members.map(member => {
                                        if (member.Membership.status === 'pending') {
                                            return (
                                                <SingleGroupMember props={[member, user, member.Membership.status]} key={member.id} />
                                            )
                                        }
                                    })}
                                </div>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
export default SingleGroup
