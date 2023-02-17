import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { postEvent } from '../../store/eventReducer'
import { fetchGroup } from '../../store/groupReducer'
import './CreateEventForm.css'

const CreateEvent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const state = useSelector(state => state)
    const group = state.groups.singleGroup
    const venues = group.Venues
    const user = state.session.user
    const { id } = useParams()

    const typeOptions = ['(select one)', 'In Person', 'Online']
    const venueOptions = []
    if (venues) {
        for (const venue of venues) {
            venueOptions.push(venue.address)
        }
    }

    const [name, setName] = useState('Test Event')
    const [type, setType] = useState('Online')
    const [capacity, setCapacity] = useState(5)
    const [venueId, setVenueId] = useState('')
    const [price, setPrice] = useState(10)
    const [description, setDescription] = useState('This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. ')
    const [startDate, setStartDate] = useState('12-12-2023 20:00:00')
    const [endDate, setEndDate] = useState('12-12-2023 20:50:00')
    const [image, setImage] = useState('https://cdn.discordapp.com/attachments/544277536255770695/1074422964025569431/20230211_124849.jpg')
    const [errors, setErrors] = useState({})

    // const [name, setName] = useState('')
    // const [type, setType] = useState(typeOptions[0])
    // const [capacity, setCapacity] = useState('')
    // const [venueId, setVenueId] = useState('')
    // const [price, setPrice] = useState('')
    // const [description, setDescription] = useState('')
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')
    // const [image, setImage] = useState('')
    // const [errors, setErrors] = useState({})

    const updateName = (e) => setName(e.target.value)
    const updateType = (e) => setType(e.target.value)
    const updateCapacity = (e) => setCapacity(e.target.value)
    const updateVenueId = (e) => setVenueId(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateStartDate = (e) => setStartDate(e.target.value)
    const updateEndDate = (e) => setEndDate(e.target.value)
    const updateImage = (e) => setImage(e.target.value)

    useEffect(() => {
        dispatch(fetchGroup(id))
    }, [])

    if (group === undefined || group === null || !Object.values(group).length) return null;

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors({})

        const errs = {}

        if (!name) errs.name = 'Name is required'
        if (type === '(select one)') errs.type = 'Event Type is required'
        if (capacity < 2) errs.capacity = 'Enter a valid capacity'
        if (!capacity) errs.capacity = 'Capacity is required'
        if (type !== 'Online' && !venueId) errs.venueId = 'Venue is required'
        if (price < 0) errs.price = 'Enter a valid price'
        if (!description || description.length < 30) errs.description = 'Description must be at least 30 characters long'
        if (!startDate) errs.startDate = 'Event start is required'
        if (!endDate) errs.endDate = 'Event end is required'
        if (!image || (!image.endsWith('.jpg') && !image.endsWith('.png') && !image.endsWith('.jpeg'))) errs.image = 'Image URL must end in .png, .jpg, or .jpeg'

        setErrors(errs)

        if (Object.values(errs).length) return;

        const startObj = new Date(startDate)
        const endObj = new Date(endDate)

        const theStartDate = `${startObj.getFullYear()}-${startObj.getMonth()}-${startObj.getDay()} ${startObj.toLocaleTimeString('it-IT')}`
        const theEndDate = `${endObj.getFullYear()}-${endObj.getMonth()}-${endObj.getDay()} ${endObj.toLocaleTimeString('it-IT')}`

        const eventInfo = {
            name,
            type,
            price,
            startDate: theStartDate,
            endDate: theEndDate,
            venueId: group.Venues[0].id,
            capacity,
            image,
            description,
            organizerId: user.id
        }

        const createdEvent = await dispatch(postEvent(eventInfo, user, group))
        history.push(`/events/${createdEvent.id}`)
    }

    return (
        <div className='CreateEventForm-main'>
            <div className='CreateEventForm-body'>
                <h2 className='CreateEventForm-title'>Create an event for {group.name}</h2>
                <form className='CreateEventForm-form' onSubmit={handleSubmit}>
                    <div className='CreateEventForm-section'>
                        <h5 className='CreateEventForm-question'>What is the name of your event?</h5>
                        <input
                            placeholder='Event Name'
                            onChange={updateName}
                            value={name}
                            className='CreateEventForm-form-name'
                        />
                        <h5 className={`CreateEventForm-errors ${errors.name ? '' : 'hidden'}`}>{errors.name}</h5>
                    </div>
                    <div className='CreateEventForm-section'>
                        <h5 className='CreateEventForm-question'>Is this an in person or online event?</h5>
                        <select
                            onChange={updateType}
                            value={type}
                            className='CreateEventForm-form-type'
                        >
                            {
                                typeOptions.map(option => {
                                    return (
                                        <option key={option}>{option}</option>
                                    )
                                })
                            }
                        </select>
                        <h5 className={`CreateEventForm-errors ${errors.type ? '' : 'hidden'}`}>{errors.type}</h5>
                        {
                            type === 'In Person' ?
                                (
                                    venueOptions.length ?
                                        <div>
                                            <h5>In which venue will it be held?</h5>
                                            <select
                                                onChange={updateVenueId}
                                                value={venueId}
                                                className='CreateEventForm-form-venue'
                                            >
                                                {
                                                    venueOptions.map(option => {
                                                        return (
                                                            <option key={option}>{option}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div> :
                                        <h5 className='CreateEventForm-errors'>You must have group venues to have an in person event.</h5>
                                ) :
                                null
                        }
                        <h5 className='CreateEventForm-question'>What is the capacity of your event?</h5>
                        <input
                            placeholder='2'
                            onChange={updateCapacity}
                            value={capacity}
                            className='CreateEventForm-form-capacity'
                        />
                        <h5 className={`CreateEventForm-errors ${errors.name ? '' : 'hidden'}`}>{errors.capacity}</h5>
                        <h5 className='CreateEventForm-question'>What is the price for your event?</h5>
                        <input
                            placeholder='0'
                            onChange={updatePrice}
                            value={price}
                            className='CreateEventForm-form-price'
                        />
                        <h5 className={`CreateEventForm-errors ${errors.price ? '' : 'hidden'}`}>{errors.price}</h5>
                    </div>
                    <div className='CreateEventForm-section'>
                        <h5 className='CreateEventForm-question'>When does your event start?</h5>
                        <input
                            placeholder='MM/DD/YYY HH:mm AM'
                            onChange={updateStartDate}
                            value={startDate}
                            className='CreateEventForm-form-start'
                        />
                        <i className="fa-regular fa-calendar-days fa-lg"></i>
                        <h5 className={`CreateEventForm-errors ${errors.startDate ? '' : 'hidden'}`}>{errors.startDate}</h5>
                        <h5 className='CreateEventForm-question'>When does your event end?</h5>
                        <input
                            placeholder='MM/DD/YYY HH:mm PM'
                            onChange={updateEndDate}
                            value={endDate}
                            className='CreateEventForm-form-end'
                        />
                        <i className="fa-regular fa-calendar-days fa-lg"></i>
                        <h5 className={`CreateEventForm-errors ${errors.endDate ? '' : 'hidden'}`}>{errors.endDate}</h5>
                    </div>
                    <div className='CreateEventForm-section'>
                        <h5 className='CreateEventForm-question'>Please add in image url for your event below:</h5>
                        <input
                            placeholder='Image URL'
                            onChange={updateImage}
                            value={image}
                            className='CreateEventForm-form-image'
                        />
                        <h5 className={`CreateEventForm-errors ${errors.image ? '' : 'hidden'}`}>{errors.image}</h5>
                    </div>
                    <div>
                        <h5 className='CreateEventForm-question'>Please describe your event:</h5>
                        <textarea
                            placeholder='Please include at least 30 characters'
                            onChange={updateDescription}
                            value={description}
                            rows='10'
                            className='CreateEventForm-form-description'
                        />
                        <h5 className={`CreateEventForm-errors ${errors.description ? '' : 'hidden'}`}>{errors.description}</h5>
                    </div>
                    <button type='submit' className='CreateEventForm-button'>Create Event</button>
                </form>
            </div>
        </div>
    )
}

export default CreateEvent
