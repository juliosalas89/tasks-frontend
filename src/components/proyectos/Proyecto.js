import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Proyecto = ({proyecto}) => {
    const { proyectoActual } = useContext(proyectoContext);

    return (
        <li>
            <button
            type='button'
            className='btn btn-blank'
            onClick={()=> proyectoActual(proyecto)}
            >{proyecto.nombre}</button>
        </li>
    );
};

export default Proyecto;