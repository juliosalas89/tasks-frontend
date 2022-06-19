import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NuevaCuenta = () => {
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, password, confirmar } = nuevoUsuario;

    const handleChange = e => {
        const nuevosDatos = {
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        };
        setNuevoUsuario(nuevosDatos);
    }

    const handleSubmit = e => {
        e.preventDefault();
        //TODO: validacion

        //Guardar en state
    }



    return (
        <div className='form-usuario'>
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
                    <input type="submit" className='btn btn-primario btn-block' value='Inicias Sesion'/>
                </div>
            </form>
            <Link to={'/'} className='enlace-cuenta'>Ya tiene una cuenta? Log in</Link>
        </div>
    </div>
    );
};

export default NuevaCuenta;