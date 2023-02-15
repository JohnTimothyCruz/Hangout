import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './MainPage.css'

function MainPage() {
    const user = useSelector(state => state.session)

    return (
        <div className='main-page-container'>
            <div className="main-page-top">
                <div className='top-left'>
                    <h1 className='title-text'>The people platform—Where interests become friendships</h1>
                    <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—log in to join the fun.</p>
                </div>
                <div className='top-right'>
                    <img src='https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640'></img>
                </div>
            </div>
            <div className='main-page-bottom'>
                <div>
                    <div className='caption'>
                        <h3>How hangOut works</h3>
                        <p className='caption-text'>Meet new people who share your interests through online and in-person events. It's free to create an account.</p>
                    </div>

                    <div className='options-container'>
                        <div className='options'>
                            <div className='option'>
                                <img src='https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256'></img>
                                <NavLink to='/groups' className='link'>See all groups</NavLink>
                                <h4>Do what you love, meet others who love it, find your community. The rest is history!</h4>
                            </div>

                            <div className='option'>
                                <img src='https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256'></img>
                                <NavLink to='/events' className='link'>Find an event</NavLink>
                                <h4>Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</h4>
                            </div>

                            <div className='option'>
                                <img src='https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256'></img>
                                <NavLink to='/groups/new' className={user.user === null ? 'inactive-link' : 'link'}>Start a new group</NavLink>
                                <h4>You don't have to be an expert to gather people together and explore shared interests.</h4>
                            </div>
                        </div>
                    </div>

                    <div className='join-button-container'>
                        <div className='join-button'>Join hangOut</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
