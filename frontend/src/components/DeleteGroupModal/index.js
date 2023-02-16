import './DeleteGroupModal.css'

const DeleteGroupModal = () => {
    return (
        <div className='delete-modal-container'>
            <h2 className='delete-modal-title'>Confirm Delete</h2>
            <h4 className='delete-modal-description'>Are you sure you want to remove this group?</h4>
            <div className='delete-modal-yes-button'>Yes (Delete Group)</div>
            <div className='delete-modal-no-button'>No (Keep Group)</div>
        </div>
    )
}

export default DeleteGroupModal
