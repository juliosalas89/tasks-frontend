import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertasContext from '../../context/alertas/AlertasContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const NuevaCuenta = () => {
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });
    const navigate = useNavigate();

    const { alerta, setAlerta } = useContext(AlertasContext);
    const { mensajeUsuario, autenticado, registrarUsuario } = useContext(AuthContext);
    const { nombre, email, password, confirmar } = nuevoUsuario;

    useEffect(()=>{
        if (autenticado) navigate('/proyectos')
        if(mensajeUsuario) {
            setAlerta(mensajeUsuario.msj, 'alerta-error')
        }
        //eslint-disable-next-line
    }, [autenticado, mensajeUsuario])

    const handleChange = e => {
        const nuevosDatos = {
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        };
        setNuevoUsuario(nuevosDatos);
    };

    const handleSubmit = e => {
        e.preventDefault();
        //TODO: validacion
        if (nombre.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === '') {
            setAlerta('Please complete the information requested', 'alerta-error')
            return;
        }
        if(password.trim().length < 6) {
            setAlerta('password must have at least 6 characters', 'alerta-error')
            return;
        }
        if(password !== confirmar) {
            setAlerta("password doesn't match", 'alerta-error')
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        });
    }



    return (
        <div className='form-usuario'>
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>) : null}
            <div className='contenedor-form sombra-dark'>
                <h1>Create an account:</h1>
                <form onSubmit={handleSubmit}>
                    <div className='campo-form'>
                        <label htmlFor="nombre">Name</label>
                        <input
                            type="text"
                            id='nombre'
                            name='nombre'
                            placeholder='Your nombre'
                            onChange={handleChange}
                            value={nombre}
                        />
                    </div>
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
                    <div className='campo-form'>
                        <label htmlFor="confirmar">Confirm Password</label>
                        <input
                            type="password"
                            id='confirmar'
                            name='confirmar'
                            placeholder='Repeat your password'
                            onChange={handleChange}
                            value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className='btn btn-primario btn-block' value='Sign Up' />
                    </div>
                </form>
                <Link to={'/'} className='enlace-cuenta'>Already have an account? Log in</Link>
            </div>
        </div>
    );
};

export default NuevaCuenta;