import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertasContext from '../../context/alertas/AlertasContext.js';
import AuthContext from '../../context/autenticacion/AuthContext.js';

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });
    const { alerta, setAlerta } = useContext(AlertasContext);
    const { iniciarSesion, mensajeUsuario, autenticado } = useContext(AuthContext);
    const { email, password } = usuario;

    useEffect(() => {
        if (autenticado) navigate('/proyectos')
        if (mensajeUsuario) {
            setAlerta(mensajeUsuario.msj, 'alerta-error')
        }
        //eslint-disable-next-line
    }, [autenticado, mensajeUsuario])


    const handleChange = e => {
        const nuevosDatos = {
            ...usuario,
            [e.target.name]: e.target.value
        };
        setUsuario(nuevosDatos);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            setAlerta('Please complete the information requested', 'alerta-error')
            return;
        }

        iniciarSesion({ email, password });
    }



    return (
        <div className='form-usuario'>
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>) : null}
            <div className='contenedor-form sombra-dark'>
                <h1>Log in with your account</h1>
                <form onSubmit={handleSubmit}>
                    <div className='campo-form'>
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
                    <div className='campo-form'>
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
                    <div className="campo-form">
                        <input type="submit" className='btn btn-primario btn-block' value='Log In' />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>New around here? Create your account</Link>
            </div>
        </div>
    );
};

export default Login;