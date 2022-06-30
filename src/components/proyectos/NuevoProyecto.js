import React, { Fragment, useContext, useState } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';


const NuevoProyecto = () => {
    const [proyecto, setProyecto] = useState({
        nombre: ''
    })

    const proyectosContext = useContext(ProyectoContext);
    const { formulario, errorform, mostrarFormulario, agregarProyecto, formularioVaico } = proyectosContext;

    const { nombre } = proyecto;

    const handleChange = e => {
        const nuevosDatos = {
            ...proyecto,
            [e.target.name]: e.target.value
        };
        setProyecto(nuevosDatos);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (nombre === '') {
            formularioVaico();
            return;
        }
        agregarProyecto(proyecto);
        setProyecto({
            nombre: ''
        })
    }

    return (
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primary'
                onClick={mostrarFormulario}
            >New Project</button>
            {formulario ? (
                <form
                    className='formulario-nuevo-proyecto'
                    onSubmit={handleSubmit}
                >
                    {errorform ? <p className='mensaje error'>Please type project name</p> : null}
                    <input
                        type="text"
                        className='input-text'
                        placeholder='Project name'
                        name='nombre'
                        onChange={handleChange}
                        value={nombre}
                    />
                    <input
                        type="submit"
                        className='btn btn-primario btn-block'
                        value='Add Project'
                    />
                </form>
            ) : null
            }
        </Fragment>
    );
};

export default NuevoProyecto;