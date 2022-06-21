import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea.js';
import proyectoContext from '../../context/proyectos/proyectoContext.js';
import TareasContext from '../../context/tareas/TareasContext.js';

const ListadoTareas = () => {

    const { proyecto, eliminarProyecto } = useContext(proyectoContext);
    const { tareasPorProyecto } = useContext(TareasContext);

    if (!proyecto) return <h2>Selecciona un proyecto</h2>

    

    return (
        <Fragment>
            <h2>Proyecto: {proyecto.nombre}</h2>

            <ul className='listado-tareas'>
                {
                    tareasPorProyecto.length === 0 ? (
                        <li className='tarea'><p>No hat tareas</p></li>
                    ) : (
                        tareasPorProyecto.map(tarea => (<Tarea tarea={tarea}></Tarea>))
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