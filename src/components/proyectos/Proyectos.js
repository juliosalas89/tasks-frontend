import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/autenticacion/AuthContext';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import { useNavigate } from 'react-router-dom';
import tokenAuth from "../../config/tokenAuth.js";

const Proyectos = () => {
    const { setUsuarioActual, token, autenticado, cargando } = useContext(AuthContext);
    const navigate = useNavigate()

    
//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       tokenAuth(token)
//     }
//   }, [])

    useEffect(() => {
        if (token) setUsuarioActual(token);
        if (!token) navigate('/');
        if (!autenticado && !cargando) navigate('/');
        //eslint-disable-next-line
    }, [cargando, autenticado])



    return (
        <div className='contenedor-app'>
            <Sidebar></Sidebar>
            <div className='seccion-principal'>
                <Barra></Barra>
                <main>
                    <FormTarea></FormTarea>
                    <div className='contenedor-tareas'>
                        <ListadoTareas></ListadoTareas>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Proyectos;