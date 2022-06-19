import React from 'react';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import NuevoProyecto from '../proyectos/NuevoProyecto';

const Sidebar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NuevoProyecto></NuevoProyecto>
            <div className='proyectos'>
                <h2>Tus Proyectos</h2>
                <ListadoProyectos></ListadoProyectos>
            </div>
        </aside>
    );
};

export default Sidebar;