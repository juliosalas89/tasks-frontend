import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareasContext from '../../context/tareas/TareasContext';

const Proyecto = ({ proyecto }) => {
    const { proyectoActual } = useContext(ProyectoContext);
    const { obtenerTareasProyecto } = useContext(TareasContext);

    const seleccionarPoryecto = proyecto => {
        proyectoActual(proyecto);
        obtenerTareasProyecto(proyecto.id)
    }

    return (
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => seleccionarPoryecto(proyecto)}
            >{proyecto.nombre}</button>
        </li>
    );
};

export default Proyecto;