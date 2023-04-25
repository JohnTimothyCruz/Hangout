import { useState } from "react";
import "./CreateGroupImageModal.css";
import { useModal } from '../../context/Modal'
import { useDispatch } from "react-redux";
import { postGroupImage } from "../../store/groupReducer";

const CreateGroupImageModal = ({ groupInfo }) => {
    const dispatch = useDispatch();
    const [groupId, groupName] = groupInfo;
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [handling, setHandling] = useState(false);
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHandling(true);

        const errs = {};
        if (!url || (!url.endsWith('.jpg') && !url.endsWith('.png') && !url.endsWith('.jpeg'))) errs.url = 'URL must end in .png, .jpg, or .jpeg';
        if (!description) errs.description = "A short description is required.";
        if (description.length > 250) errs.description = "Description must be less thatn 250 characters.";
        if (Object.values(errs).length) {
            setErrors(errs)
        } else {
            const res = dispatch(postGroupImage(groupId, url, description, false));

            if (res.ok) {
                closeModal();
            } else {
                errs.server = "Sorry, there was a problem with the server. Please try again later.";
            }
        }

        setHandling(false);
    };

    return (
        <div className="post-image-modal">
            <h2 className="post-image-modal-title">Post a photo to {groupName}</h2>
            <form
                className="post-image-modal-form"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="post-image-modal-form-section">
                    <p className="post-image-modal-form-text">Image url:</p>
                    <input
                        className="post-image-modal-form-input"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value)
                            setErrors({ "description": errors?.description })
                        }}
                    />
                    <p className="post-image-modal-form-error">{errors?.url}</p>
                </div>
                <div className="post-image-modal-form-section">
                    <p className="post-image-modal-form-text">Picture description:</p>
                    <textarea
                        className="post-image-modal-form-textarea"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            setErrors({ "url": errors?.url })
                        }}
                    />
                    <p className="post-image-modal-form-error">{errors?.description}</p>
                </div>
                <p className="post-image-modal-form-error">{errors?.server}</p>
                <button
                    className="post-image-modal-form-button"
                    disabled={handling}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateGroupImageModal;
