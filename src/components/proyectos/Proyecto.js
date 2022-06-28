import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareasContext from '../../context/tareas/TareasContext';

const Proyecto = ({ proyecto }) => {
    const { setProyectoActual } = useContext(ProyectoContext);
    const { obtenerTareasProyecto } = useContext(TareasContext);

    const seleccionarPoryecto = proyecto => {
        setProyectoActual(proyecto);
        obtenerTareasProyecto(proyecto._id)
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