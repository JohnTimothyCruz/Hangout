import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postGroup } from '../../store/groupReducer'
import './CreateGroupForm.css'

const typeOptions = ['(select one)', 'Online', 'In Person'];
const publicityOptions = ['(select one)', 'Public', 'Private'];

const CreateGroupForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const [location, setLocation] = useState('')
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [type, setType] = useState(typeOptions[0])
    const [publicity, setPublicity] = useState(typeOptions[0])
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState({})

    const updateLocation = (e) => setLocation(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateAbout = (e) => setAbout(e.target.value);
    const updateType = (e) => setType(e.target.value);
    const updatePublicity = (e) => setPublicity(e.target.value);
    const updateImage = (e) => setImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({})

        const errs = {}

        if (location.split(',').length !== 2 && location.split(', ').length !== 2) errs.location = 'Please use "City, State" format'
        if (!location) errs.location = 'Location is required'
        if (!name) errs.name = 'Name is required'
        if (!about || about.length < 50) errs.description = 'Description must be at least 30 characters long'
        if (type === '(select one)') errs.type = 'Group Type is required'
        if (publicity === '(select one)') errs.publicity = 'Visibility Type is required'
        if (!image || (!image.endsWith('.jpg') && !image.endsWith('.png') && !image.endsWith('.jpeg'))) errs.image = 'Image URL must end in .png, .jpg, or .jpeg'

        setErrors(errs)

        if (Object.values(errs).length) return;

        let cityState = location.split(', ');
        if (cityState.length !== 2) cityState = location.split(',');

        const groupInfo = {
            city: cityState[0],
            state: cityState[1],
            name,
            about,
            type,
            private: publicity === 'Private' ? true : false,
            imageInfo: {
                url: image,
                preview: true,
                description: "group-cover"
            },
            organizerId: user.id
        }

        const createdGroup = await dispatch(postGroup(groupInfo, user))
        history.push(`/groups/${createdGroup.id}`)
    }

    const handleTestSubmit = async () => {
        const groupInfo = {
            city: "Albategnius",
            state: "Moon",
            name: `Test Group ${user.id}`,
            about: "This text does meet the fifty character requirement.",
            type: "Online",
            private: true,
            imageInfo: {
                url: "https://cdn.discordapp.com/attachments/544277536255770695/1074422964025569431/20230211_124849.jpg",
                preview: true,
                description: "group-cover"
            },
            organizerId: user.id
        }

        const createdGroup = await dispatch(postGroup(groupInfo, user))
        history.push(`/groups/${createdGroup.id}`)
    }

    return (
        <div className='CreateGroupForm-main'>
            <div className='CreateGroupForm-body'>
                <form className='CreateGroupForm-form' onSubmit={handleSubmit}>
                    <div className='CreateGroupForm-title CreateGroupForm-section'>
                        <h4 className='CreateGroupForm-first-text'>BECOME AN ORGANIZER</h4>
                        <h2 className='CreateGroupForm-second-text'>We'll walk you through a few steps to build your local commumnity</h2>
                    </div>
                    <div className='CreateGroupForm-location CreateGroupForm-section'>
                        <h2 className='CreateGroupForm-section-title'>First, set your group's location.</h2>
                        <h5 className='CreateGroupForm-section-description'>Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</h5>
                        <input
                            placeholder='City, STATE'
                            onChange={updateLocation}
                            value={location}
                            className='CreateGroupForm-input'
                        />
                        <h5 className={`CreateGroupForm-errors ${errors.location ? '' : 'hidden'}`}>{errors.location}</h5>
                    </div>
                    <div className='CreateGroupForm-name CreateGroupForm-section'>
                        <h2 className='CreateGroupForm-section-title'>What will your group's name be?</h2>
                        <h5 className='CreateGroupForm-section-description'>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</h5>
                        <input
                            placeholder='What is your group name?'
                            onChange={updateName}
                            value={name}
                            className='CreateGroupForm-input'
                        />
                        <h5 className={`CreateGroupForm-errors ${errors.name ? '' : 'hidden'}`}>{errors.name}</h5>
                    </div>
                    <div className='CreateGroupForm-About CreateGroupForm-section'>
                        <h2 className='CreateGroupForm-section-title'>Now describe what your group will be about.</h2>
                        <h5>People will see this when we promote your group, but you'll be able to add to it later, too.</h5>
                        <ol className='CreateGroupForm-ol'>
                            <li className='CreateGroupForm-li'>What's the purpose of the group?</li>
                            <li className='CreateGroupForm-li'>Who should join?</li>
                            <li className='CreateGroupForm-li'>What will you do at your events?</li>
                        </ol>
                        <textarea
                            placeholder='Please write at least 50 characters'
                            onChange={updateAbout}
                            value={about}
                            className='CreateGroupForm-input'
                            rows='10'
                        />
                        <h5 className={`CreateGroupForm-errors ${errors.description ? '' : 'hidden'}`}>{errors.description}</h5>
                    </div>
                    <div className='CreateGroupForm-final-steps CreateGroupForm-section'>
                        <h2 className='CreateGroupForm-section-title'>Final steps...</h2>
                        <h5 className='CreateGroupForm-section-description'>Is this an in person or online group?</h5>
                        <select
                            onChange={updateType}
                            value={type}
                        >
                            {
                                typeOptions.map(option => {
                                    return (
                                        <option key={option}>{option}</option>
                                    )
                                })
                            }
                        </select>
                        <h5 className={`CreateGroupForm-errors ${errors.type ? '' : 'hidden'}`}>{errors.type}</h5>
                        <h5>Is this group private or public?</h5>
                        <select
                            onChange={updatePublicity}
                            value={publicity}
                        >
                            {
                                publicityOptions.map(option => {
                                    return (
                                        <option key={option}>{option}</option>
                                    )
                                })
                            }
                        </select>
                        <h5 className={`CreateGroupForm-errors ${errors.publicity ? '' : 'hidden'}`}>{errors.publicity}</h5>
                        <h5>Please add an image url for your group below:</h5>
                        <input
                            placeholder='Image Url'
                            onChange={updateImage}
                            value={image}
                            className='CreateGroupForm-input'
                        />
                        <h5 className={`CreateGroupForm-errors ${errors.image ? '' : 'hidden'}`}>{errors.image}</h5>
                    </div>
                    <div className='CreateGroupForm-button-container'>
                        <button type='submit'>Create Group</button>
                        <div onClick={() => handleTestSubmit()}>Create Default Group (one per user)</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateGroupForm
