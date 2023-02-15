import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postGroup } from '../../store/groupReducer'
import './CreateGroupForm.css'

const CreateGroupForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const [location, setLocation] = useState('')
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [status, setStatus] = useState('')
    const [publicity, setPublicity] = useState('')
    const [image, setImage] = useState('')

    const updateLocation = (e) => setLocation(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateAbout = (e) => setAbout(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);
    const updatePublicity = (e) => setPublicity(e.target.value);
    const updateImage = (e) => setImage(e.target.value);

    const errs = {}

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cityState = location.split(', ')

        const payload = {
            city: cityState[0],
            state: cityState[1],
            name,
            about,
            status,
            private: publicity === 'Private' ? true : false,
            // image,
            organizerId: user.id
        }

        console.log(payload)

        dispatch(postGroup(payload))
        .catch(
            async(res) => {
                console.log(res)
            }
        )
    }

    return (
        <div className='CreateGroupForm-main'>
            <div className='CreateGroupForm-body'>
                <form className='CreateGroupForm-form' onSubmit={handleSubmit}>
                    <div className='CreateGroupForm-title CreateGroupForm-section'>
                        <h4 className='CreateGroupForm-first-text'>BECOME AN ORGANIZER</h4>
                        <h2>We'll walk you through a few steps to build your local commumnity</h2>
                    </div>
                    <div className='CreateGroupForm-location CreateGroupForm-section'>
                        <h2>First, set your group's location.</h2>
                        <h5>Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</h5>
                        <input
                            placeholder='City, STATE'
                            onChange={updateLocation}
                            value={location}
                        />
                    </div>
                    <div className='CreateGroupForm-name CreateGroupForm-section'>
                        <h2>What will your group's name be?</h2>
                        <h5>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</h5>
                        <input
                            placeholder='What is your group name?'
                            onChange={updateName}
                            value={name}
                        />
                    </div>
                    <div className='CreateGroupForm-About CreateGroupForm-section'>
                        <h2>Now describe what your group will be about.</h2>
                        <h5>People will see this when we promote your group, but you'll be able to add to it later, too.</h5>
                        <ol>
                            <li>What's the purpose of the group?</li>
                            <li>Who should join?</li>
                            <li>What will you do at your events?</li>
                        </ol>
                        <textarea
                            placeholder='Please write at least 30 characters'
                            onChange={updateAbout}
                            value={about}
                        />
                    </div>
                    <div className='CreateGroupForm-final-steps CreateGroupForm-section'>
                        <h2>Final steps...</h2>
                        <h5>Is this an in person or online group?</h5>
                        <select
                            onChange={updateStatus}
                            value={status}
                        >
                            <option>(select one)</option>
                            <option>In person</option>
                            <option>Online</option>
                        </select>
                        <h5>Is this group private or public?</h5>
                        <select
                            onChange={updatePublicity}
                            value={publicity}
                        >
                            <option>(select one)</option>
                            <option>Private</option>
                            <option>Public</option>
                        </select>
                        <h5>Please add an image url for your group below:</h5>
                        <input
                            placeholder='Image Url'
                            onChange={updateImage}
                            value={image}
                        />
                    </div>
                    <div className='CreateGroupForm-create-button'>
                        <button type='submit'>Create group</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateGroupForm
