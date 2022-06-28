import React from 'react';
import { useContext } from 'react';
import TareasContext from '../../context/tareas/TareasContext';

const Tarea = ({ tarea }) => {
    const { eliminarTarea, cambiarEstadoTarea, setTareaActual } = useContext(TareasContext)

    const handleEstadoTarea = booleano => {
        tarea.estado = booleano;
        cambiarEstadoTarea(tarea)
    }

    return (
        <li className='tarea sombra'>
            <p>{tarea.nombre}</p>
            <div className='estado'>
                {
                    tarea.estado ? (
                        <button
                            type='button'
                            className='completo'
                            onClick={() => handleEstadoTarea(false)}
                        >Completo</button>
                    ) : (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={() => handleEstadoTarea(true)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => setTareaActual(tarea)}
                >Editar</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={()=> eliminarTarea(tarea)}
                >Eliminar</button>
            </div>
        </li>
    );
};

export default Tarea;