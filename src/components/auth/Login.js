import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const handleChange = e => {
        const nuevosDatos = {
            ...usuario,
            [e.target.name]: e.target.value
        };
        setUsuario(nuevosDatos);
    }

    const handleSubmit = e => {
        e.preventDefault();
        //TODO: validacion

        //Guardar en state
    }



    return (
        <div className='form-usuario'>
        <div className='contenedor-form sombra-dark'>
            <h1>Inicicar Sesion</h1>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="password">Email</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        placeholder='Tu Password'
                        onChange={handleChange}
                        value={password}
                    />
                </div>
                <div className="campo-form">
                    <input type="submit" className='btn btn-primario btn-block' value='Inicias Sesion'/>
                </div>
            </form>
            <Link to={'/nueva-cuenta'} className='enlace-cuenta'>Eres nuevo? Crea una cuenta</Link>
        </div>
    </div>
    );
};

export default Login;