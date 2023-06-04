import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertsContext from '../../context/alerts/AlertsContext';
import AuthContext from '../../context/authentication/AuthContext';

const SignUp = () => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });
    const navigate = useNavigate();

    const { alert, setAlert } = useContext(AlertsContext);
    const { userMessage, authenticated, registerUser } = useContext(AuthContext);
    const { name, email, password, confirm } = newUser;

    useEffect(()=>{
        if (authenticated) navigate('/projects')
        if(userMessage) {
            setAlert(userMessage.message, 'alert-error')
        }
        //eslint-disable-next-line
    }, [authenticated, userMessage])

    const handleChange = e => {
        const newData = {
            ...newUser,
            [e.target.name]: e.target.value
        };
        setNewUser(newData);
    };

    const handleSubmit = e => {
        e.preventDefault();
        //TODO: validacion
        if (name.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirm.trim() === '') {
            setAlert('Please complete the information requested', 'alert-error')
            return;
        }
        if(password.trim().length < 6) {
            setAlert('password must have at least 6 characters', 'alert-error')
            return;
        }
        if(password !== confirm) {
            setAlert("password doesn't match", 'alert-error')
            return;
        }

        registerUser({
            name,
            email,
            password
        });
    }



    return (
        <div className='form-user'>
            {alert ? (<div className={`alert ${alert.category}`}>{alert.message}</div>) : null}
            <div className='form-container shadow-dark'>
                <h1>Create an account:</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-field'>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            placeholder='Your name'
                            onChange={handleChange}
                            value={name}
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Your email'
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Your password'
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            id='confirm'
                            name='confirm'
                            placeholder='Repeat your password'
                            onChange={handleChange}
                            value={confirm}
                        />
                    </div>
                    <div className="form-field">
                        <input type="submit" className='btn btn-primario btn-block' value='Sign Up' />
                    </div>
                </form>
                <Link to={'/'} className='account-link'>Already have an account? Log in</Link>
            </div>
        </div>
    );
};

export default SignUp;