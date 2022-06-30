import React from 'react';
import { useContext } from 'react';
import TareasContext from '../../context/tareas/TareasContext';

const Tarea = ({ tarea }) => {
    const { eliminarTarea, guardarCambiosTarea, setTareaActual } = useContext(TareasContext)

    const handleEstadoTarea = booleano => {
        tarea.estado = booleano;
        guardarCambiosTarea(tarea)
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
                        >Complete</button>
                    ) : (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={() => handleEstadoTarea(true)}
                        >Incomplete</button>
                    )
                }
            </div>
            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => setTareaActual(tarea)}
                >Edit task</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={()=> eliminarTarea(tarea)}
                >Delete</button>
            </div>
        </li>
    );
};

export default Tarea;