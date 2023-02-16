import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteGroup, removeGroup } from '../../store/groupReducer'
import './DeleteGroupModal.css'

const DeleteGroupModal = () => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    const user = useSelector(state => state.session.user)

    const handleDelete = () => {
        console.log(groupId, user)
        // dispatch(deleteGroup(user, id))
    }

    return (
        <div className='delete-modal-container'>
            <h2 className='delete-modal-title'>Confirm Delete</h2>
            <h4 className='delete-modal-description'>Are you sure you want to remove this group?</h4>
            <div className='delete-modal-yes-button' onClick={handleDelete}>Yes (Delete Group)</div>
            <div className='delete-modal-no-button'>No (Keep Group)</div>
        </div>
    )
}

export default DeleteGroupModal
