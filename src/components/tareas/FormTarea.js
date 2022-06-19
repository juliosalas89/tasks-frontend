import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const FormTarea = () => {
    const { proyecto } = useContext(proyectoContext);
    
    if (!proyecto) return null;

    return (
        <div className='formulario'>
            <form>
                <div className='contenedor-input'>
                    <input
                        type="text"
                        className='input-text'
                        placeholder='Nombre Tarea... '
                        name='nombre'
                    />
                </div>
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