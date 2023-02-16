import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { deleteGroup } from '../../store/groupReducer'
import './DeleteGroupModal.css'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useModal } from '../../context/Modal'

const DeleteGroupModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const id = useSelector(state => state.groups.singleGroup.id)
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    const handleDelete = async () => {
        const res = await dispatch(deleteGroup(user, id))
        closeModal()
        if (res) {
            history.push('/groups')
        }
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
