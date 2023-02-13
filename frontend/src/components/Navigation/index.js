import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <div className='header'>
        <NavLink exact to="/" className='logo-container'>
          <div className='logo'>
            hangOut
          </div>
        </NavLink>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
      <div className='takes-space'></div>
    </>
  );
}

export default Navigation;
