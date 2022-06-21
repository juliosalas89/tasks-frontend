import React, { useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareasContext from '../../context/tareas/TareasContext';
import { v4 as uuidv4 } from "uuid"
import { useEffect } from 'react';

const FormTarea = () => {
    const [error, setError] = useState(false)
    const [nuevaTarea, setNuevaTarea] = useState({
        nombre: '',
        estado: false
    })   
    
    const {nombre} = nuevaTarea;
    const { proyecto } = useContext(proyectoContext);
    const { tareas, agregarTarea, obtenerTareasProyecto } = useContext(TareasContext);
    
    useEffect(()=> {
        obtenerTareasProyecto(proyecto.id);
        //eslint-disable-next-line
    }, [tareas])

    if (!proyecto) return null;

    const handleChange = e => {
        const datos = {
            ...nuevaTarea,
            [e.target.name]: e.target.value
        };
        setNuevaTarea(datos);
    };


    const prepararTarea = e => {
        e.preventDefault();
        if(nombre.trim() === '') {
            setError(true)
            return
        }
        setError(false)
        nuevaTarea.id = uuidv4();
        nuevaTarea.proyectoId = proyecto.id;
        agregarTarea(nuevaTarea)
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
                        placeholder='Nombre Tarea... '
                        name='nombre'
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>
                {
                    error ? <p>Debe introducir un nombre de tarea</p> : null 
                }
                <div className='contenedor-input'>
                    <input
                        type="submit"
                        className='btn btn-block btn-primario btn-submit'
                        value='Agregar Tarea'
                    />
                </div>
            </form>
        </div>
    );
};

export default FormTarea;