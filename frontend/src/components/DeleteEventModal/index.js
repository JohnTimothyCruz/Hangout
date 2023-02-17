import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { deleteEvent } from '../../store/eventReducer'
import './DeleteEventModal.css'


const DeleteEventModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const id = useSelector(state => state.events.singleEvent.id)
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    const handleDelete = async () => {
        const res = await dispatch(deleteEvent(user, id))
        closeModal()
        if (res) {
            history.push('/events')
        }
    }

    return (
        <div className='delete-modal-container'>
            <h2 className='delete-modal-title'>Confirm Delete</h2>
            <h4 className='delete-modal-description'>Are you sure you want to remove this event?</h4>
            <div className='delete-modal-yes-button' onClick={handleDelete}>Yes (Delete Event)</div>
            <div className='delete-modal-no-button' onClick={closeModal}>No (Keep Event)</div>
        </div>
    )
}

export default DeleteEventModal
