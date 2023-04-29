import { useModal } from "../../context/Modal";
import './AboutModal.css'

const AboutModal = () => {
    const { closeModal } = useModal();

    return (
        <div id="about-modal">
            <h2 id="about-prompt">Get in touch with the creator of Hangout, John Cruz:</h2>
            <div id="about-me-container">
                <a href="https://github.com/JohnTimothyCruz" rel="noreferrer" target="_blank"><i className="fa-brands fa-github fa-xl" /></a>
                <a href="https://www.linkedin.com/in/john-cruz-06879026b/" rel="noreferrer" target="_blank"><i className="fa-brands fa-linkedin fa-xl" /></a>
            </div>
            <div id="about-close-button" onClick={() => closeModal()}>Close</div>
        </div>
    )
}

export default AboutModal
