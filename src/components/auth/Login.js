import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertasContext from '../../context/alertas/AlertasContext';
import AuthContext from '../../context/autenticacion/AuthContext';

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
            setAlerta('Ambos campos son obligatorios', 'alerta-error')
            return;
        }

        iniciarSesion({ email, password });
    }



    return (
        <div className='form-usuario'>
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>) : null}
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
                        <input type="submit" className='btn btn-primario btn-block' value='Inicias Sesion' />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>Eres nuevo? Crea una cuenta</Link>
            </div>
        </div>
    );
};

export default Login;