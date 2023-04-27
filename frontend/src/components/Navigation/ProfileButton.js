import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import { NavLink } from 'react-router-dom';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const divClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            {user ? (
                <div className="user-menu">
                    <NavLink to='/groups/new' className='nav-link'>Start a new group</NavLink>
                    <button onClick={openMenu} className='user-icon'>
                        <div className='user-icon-circle-inner'>
                            {user.firstName.split("")[0]}
                        </div>
                    </button>
                    <div onClick={openMenu}>
                        <i className={showMenu ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"} />
                    </div>
                    <div className={divClassName} ref={ulRef}>
                        <ul className="top-ul">
                            <li className="dropdown-greeting">Hello, {user.username}</li>
                            <li className="profile-button"><NavLink to={`/profile/users/${user?.id}`}>Profile</NavLink></li>
                        </ul>
                        <ul className="bottom-ul">
                            <li className="button" onClick={logout}>Log out</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className='session-options'>
                    <OpenModalMenuItem
                        itemText="Log In"
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalMenuItem
                        itemText="Sign Up"
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            )}
        </>
    );
}

export default ProfileButton;
