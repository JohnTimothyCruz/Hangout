import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteGroup } from '../../store/groupReducer'
import { useModal } from '../../context/Modal'
import './DeleteGroupModal.css'

const DeleteGroupModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const id = useSelector(state => state.groups.singleGroup.id)
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    const handleDelete = async () => {
        dispatch(deleteGroup(user, id))
        .then(closeModal())
        .then(history.push('/groups'))
    }

    return (
        <div className='delete-modal-container'>
            <h2 className='delete-modal-title'>Confirm Delete</h2>
            <h4 className='delete-modal-description'>Are you sure you want to remove this group?</h4>
            <div className='delete-modal-yes-button' onClick={handleDelete}>Yes (Delete Group)</div>
            <div className='delete-modal-no-button' onClick={closeModal}>No (Keep Group)</div>
        </div>
    )
}

export default DeleteGroupModal
