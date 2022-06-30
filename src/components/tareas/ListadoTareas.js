import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea.js';
import ProyectoContext from '../../context/proyectos/ProyectoContext.js';
import TareasContext from '../../context/tareas/TareasContext.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {

    const { proyectoActual, eliminarProyecto } = useContext(ProyectoContext);
    const { tareasPorProyecto } = useContext(TareasContext);

    if (!proyectoActual) return <h2>Select a project</h2>



    return (
        <Fragment>
            <h2>Project: {proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                {
                    tareasPorProyecto.length === 0 ? (
                        <li className='tarea'><p>No tasks yet...</p></li>
                    ) : <TransitionGroup>
                        {tareasPorProyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={250}
                                classNames='tarea'
                            >
                                <Tarea tarea={tarea}></Tarea>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type='button'
                className='btn incompleto'
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >Delete this Project &times;</button>
        </Fragment>
    );
};

export default ListadoTareas;