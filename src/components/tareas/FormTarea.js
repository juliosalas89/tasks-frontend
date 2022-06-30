import React, { useContext, useState } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareasContext from '../../context/tareas/TareasContext';
import { v4 as uuidv4 } from "uuid"
import { useEffect } from 'react';

const FormTarea = () => {
    const [nuevaTarea, setNuevaTarea] = useState({
        nombre: '',
        estado: false
    })
    const { nombre } = nuevaTarea;
    const { proyectoActual } = useContext(ProyectoContext);
    const {
        tareas,
        agregarTarea,
        obtenerTareasProyecto,
        erorFormTarea,
        validarFormTarea,
        tareaActual,
        setTareaActual,
        guardarCambiosTarea
    } = useContext(TareasContext);

    useEffect(() => {
        if (proyectoActual) obtenerTareasProyecto(proyectoActual._id);
        if (tareaActual) setNuevaTarea(tareaActual)
        //eslint-disable-next-line
    }, [tareas, tareaActual])

    if (!proyectoActual) return null;

    const handleChange = e => {
        const datos = {
            ...nuevaTarea,
            [e.target.name]: e.target.value
        };
        setNuevaTarea(datos);
    };


    const prepararTarea = e => {
        e.preventDefault();
        if (nombre.trim() === '') {
            validarFormTarea(true);
            return;
        }
        if (tareaActual) {
            guardarCambiosTarea(nuevaTarea)
        } else {
            nuevaTarea.id = uuidv4();
            nuevaTarea.proyectoId = proyectoActual._id;
            agregarTarea(nuevaTarea);
        }
        setNuevaTarea({
            nombre: '',
            estado: false
        })
    }

    const cancelarEdicion = () => {
        setTareaActual(null);
        validarFormTarea(false);
        setNuevaTarea({
            nombre: '',
            estado: false
        })
    }

    return (
        <div className='formulario'>
            <form onSubmit={prepararTarea}>
                <div className='contenedor-input'>
                    <input
                        type="text"
                        className='input-text'
                        placeholder='Task name... '
                        name='nombre'
                        onChange={handleChange}
                        value={nombre}
                    />
                    {tareaActual ?
                        <button
                            onClick={cancelarEdicion}
                        >Cancel</button>
                        : null}
                </div>
                {
                    erorFormTarea ? <p className='mensaje error'>Please type a task</p> : null
                }
                <div className='contenedor-input'>
                    <input
                        type="submit"
                        className='btn btn-block btn-primario btn-submit'
                        value={tareaActual ? 'Save Changes' : 'Add Task'}
                    />
                </div>
            </form>
        </div>
    );
};

export default FormTarea;