import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSingleEvent } from '../../store/eventReducer'
import './SingleEvent.css'

const SingleEvent = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const event = useSelector(state => state.events)

    useEffect(() => {
        dispatch(fetchSingleEvent(id))
    }, [])

    if (!Object.values(event.singleEvent).length) return null;

    return (
        <h1>You've already implemented a way to get the event by id. Now just format the page.</h1>
    )
}

export default SingleEvent
