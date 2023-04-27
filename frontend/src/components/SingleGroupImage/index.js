import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGroupImage } from '../../store/groupReducer';
import './SingleGroupImage.css'

const SingleGroupImage = ({ props }) => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const [image, userId, organizerId] = props;

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current?.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleGroupImageDelete = async (id) => {
        dispatch(deleteGroupImage(id))
    }

    return (
        <div className='group-images-image-container'>
            {userId === organizerId &&
                <i className="fa-solid fa-ellipsis group-images-image-ellipsis" onClick={() => setShowMenu(!showMenu)} />
            }
            <img src={image.url} className='group-images-image' />
            <p>{image?.description}</p>
            <div className={showMenu ? "group-images-image-delete" : "hidden"} onClick={() => handleGroupImageDelete(image?.id)}>Delete Image</div>
        </div>
    )
}

export default SingleGroupImage
