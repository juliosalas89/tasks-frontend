import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';


const ListadoProyectos = () => {
    const proyectosContext = useContext(proyectoContext)
    const { proyectos, obtenerProyectos } = proyectosContext;

    useEffect(()=> {
        obtenerProyectos();
        //eslint-disable-next-line
    }, [])

    if(proyectos.length === 0) return <p>No hay proyectos, crea un proyecto para empezar a trabajar</p>;

    return (
        <ul className='listado-proyectos'>
            {proyectos.map(proyecto => (<Proyecto key={proyecto.id} proyecto={proyecto}></Proyecto>))}
        </ul>
    );
};

export default ListadoProyectos;