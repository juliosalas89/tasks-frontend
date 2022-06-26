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
            setAlerta('Todos los campos son obligatorios', 'alerta-error')
            return;
        }
        if(password.trim().length < 6) {
            setAlerta('El password debe tener al menos 6 caracteres', 'alerta-error')
            return;
        }
        if(password !== confirmar) {
            setAlerta('El password no coincide', 'alerta-error')
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
                <h1>Crea una nueva cuenta:</h1>
                <form onSubmit={handleSubmit}>
                    <div className='campo-form'>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id='nombre'
                            name='nombre'
                            placeholder='Tu Nombre'
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
                            placeholder='Tu Email'
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
                            placeholder='Tu Password'
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id='confirmar'
                            name='confirmar'
                            placeholder='Repite tu Password'
                            onChange={handleChange}
                            value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className='btn btn-primario btn-block' value='Inicias Sesion' />
                    </div>
                </form>
                <Link to={'/'} className='enlace-cuenta'>Ya tiene una cuenta? Log in</Link>
            </div>
        </div>
    );
};

export default NuevaCuenta;