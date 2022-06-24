import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const ListadoProyectos = () => {
    const { proyectos, obtenerProyectos } = useContext(ProyectoContext)

    useEffect(() => {
        obtenerProyectos();
        //eslint-disable-next-line
    }, [])

    if (proyectos.length === 0) return <p>No hay proyectos, crea un proyecto para empezar a trabajar</p>;

    return (
        <ul className='listado-proyectos'>
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
                        timeout={250}
                        classNames='proyecto'
                    >
                        <Proyecto proyecto={proyecto}></Proyecto>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ListadoProyectos;