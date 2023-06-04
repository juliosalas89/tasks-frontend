import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertsContext from '../../context/alerts/AlertsContext.js';
import AuthContext from '../../context/authentication/AuthContext.js';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const { alert, setAlerta } = useContext(AlertsContext);
    const { logIn, userMessage, authenticated } = useContext(AuthContext);
    const { email, password } = user;

    useEffect(() => {
        if (authenticated) navigate('/projects')
        if (userMessage) {
            setAlerta(userMessage.message, 'alert-error')
        }
        //eslint-disable-next-line
    }, [authenticated, userMessage])


    const handleChange = e => {
        const newData = {
            ...user,
            [e.target.name]: e.target.value
        };
        setUser(newData);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            setAlerta('Please complete the information requested', 'alert-error')
            return;
        }

        logIn({ email, password });
    }



    return (
        <div className='form-user'>
            {alert ? (<div className={`alert ${alert.category}`}>{alert.message}</div>) : null}
            <div className='form-container shadow-dark'>
                <h1>Log in with your account</h1>
                <form onSubmit={handleSubmit}>
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
                    <div className="form-field">
                        <input type="submit" className='btn btn-primario btn-block' value='Log In' />
                    </div>
                </form>
                <Link to={'/new-account'} className='account-link'>New around here? Create your account</Link>
            </div>
        </div>
    );
};

export default Login;