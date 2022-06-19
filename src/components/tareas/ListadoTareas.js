import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea.js';
import proyectoContext from '../../context/proyectos/proyectoContext.js';

const ListadoTareas = () => {

    const { proyecto, eliminarProyecto } = useContext(proyectoContext);

    if (!proyecto) return <h2>Selecciona un proyecto</h2>

    const tareas = [
        { nombre: 'Elegir color', estado: true },
        { nombre: 'Elegir tamaño', estado: false },
        { nombre: 'Elegir fuente', estado: false },
        { nombre: 'dibujar dibujo', estado: true }
    ]

    return (
        <Fragment>
            <h2>Proyecto: {proyecto.nombre}</h2>

            <ul className='listado-tareas'>
                {
                    tareas.length === 0 ? (
                        <li className='tarea'><p>No hat tareas</p></li>
                    ) : (
                        tareas.map(tarea => (<Tarea tarea={tarea}></Tarea>))
                    )
                }
            </ul>
            <button
                type='button'
                className='btn incompleto'
                onClick={()=> eliminarProyecto(proyecto.id)}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
};

export default ListadoTareas;