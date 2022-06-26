import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/autenticacion/AuthContext';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';

const Proyectos = () => {

    const { setUsuarioActual, token} = useContext(AuthContext);

    useEffect(()=> {
        setUsuarioActual(token);
        //eslint-disable-next-line
    },[])

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