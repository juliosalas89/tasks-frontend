import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/authentication/AuthContext';

const UserBar = () => {
    const { currentUser, logOut } = useContext(AuthContext);

    return (
        <header className='app-header'>
            {currentUser ?
                <p className='user-name'>Hi <span>{currentUser.name}</span></p>
                : null}
            <nav className='main-nav'>
                <button
                    className='btn btn-blank log-out'
                    onClick={logOut}
                >Sign Out</button>
            </nav>
        </header>
    );
};

export default UserBar;