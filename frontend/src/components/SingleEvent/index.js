import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSingleEvent } from '../../store/eventReducer'
import './SingleEvent.css'

const SingleEvent = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const event = useSelector(state => state.events.singleEvent)

    useEffect(() => {
        dispatch(fetchSingleEvent(id));
    }, [])

    if (event === undefined) return null;

    console.log(event)
    return (
        <div className='body'>
            <div className='main-top'>
                <h4>Events</h4>
                <h2>{event.name}</h2>
                <h4>Hosted by {event.organizer.firstName} {event.organizer.firstName}</h4>
            </div>
            <div className='main-middle'>

            </div>
            <div className='main-bottom'>

            </div>
        </div>
    )
}

export default SingleEvent
