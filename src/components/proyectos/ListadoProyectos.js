import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertasContext from '../../context/alertas/AlertasContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const ListadoProyectos = () => {
    const { mensaje, proyectos, obtenerProyectos, setProyectoActual } = useContext(ProyectoContext);
    const { alerta, setAlerta } = useContext(AlertasContext);
    const { usuarioActual } = useContext(AuthContext);

    useEffect(()=>{
        if(mensaje) setAlerta(mensaje.msj, mensaje.categoria);
        //eslint-disable-next-line
    }, [mensaje])

    useEffect(() => {
        obtenerProyectos();
        setProyectoActual(null);
        //eslint-disable-next-line
    }, [usuarioActual])

    if (proyectos.length === 0) return <p>No projects yet, create a project to start...</p>;

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