import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertasContext from '../../context/alertas/AlertasContext';

const ListadoProyectos = () => {
    const { mensaje, proyectos, obtenerProyectos } = useContext(ProyectoContext);
    const { alerta, setAlerta } = useContext(AlertasContext);

    useEffect(()=>{
        if(mensaje) setAlerta(mensaje.msj, mensaje.categoria);
        //eslint-disable-next-line
    }, [mensaje])

    useEffect(() => {
        obtenerProyectos();
        //eslint-disable-next-line
    }, [])

    if (proyectos.length === 0) return <p>No hay proyectos, crea un proyecto para empezar a trabajar</p>;

    return (
        <ul className='listado-proyectos'>
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
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