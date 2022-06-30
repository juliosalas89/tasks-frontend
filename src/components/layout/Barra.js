import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/autenticacion/AuthContext';

const Barra = () => {
    const { usuarioActual, cerrarSesion } = useContext(AuthContext);

    return (
        <header className='app-header'>
            {usuarioActual ?
                <p className='nombre-usuario'>Hi <span>{usuarioActual.nombre}</span></p>
                : null}
            <nav className='nav-principal'>
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={cerrarSesion}
                >Sign Out</button>
            </nav>
        </header>
    );
};

export default Barra;