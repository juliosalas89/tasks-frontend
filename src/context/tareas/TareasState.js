import React, { useReducer } from 'react';
import TareasContext from './TareasContext';
import TareasReducer from './TareasReducer'
import { AGREGAR_TAREA, TAREAS_PROYECTO } from '../../types';


const TareasState = (props) => {
    const initialState = {
        tareas: [
            { nombre: 'Elegir color', estado: true, proyectoId: 1 },
            { nombre: 'Elegir tamaño', estado: false, proyectoId: 2 },
            { nombre: 'Elegir fuente', estado: false, proyectoId: 3 },
            { nombre: 'dibujar dibujo', estado: true, proyectoId: 4 },
            { nombre: 'Elegir color', estado: true, proyectoId: 1 },
            { nombre: 'Elegir tamaño', estado: false, proyectoId: 2 },
            { nombre: 'Elegir fuente', estado: false, proyectoId: 3 },
            { nombre: 'dibujar dibujo', estado: true, proyectoId: 4 },
            { nombre: 'Elegir color', estado: true, proyectoId: 1 },
            { nombre: 'Elegir tamaño', estado: false, proyectoId: 2 },
            { nombre: 'Elegir fuente', estado: false, proyectoId: 3 },
            { nombre: 'dibujar dibujo', estado: true, proyectoId: 4 },
            { nombre: 'Elegir color', estado: true, proyectoId: 1 },
            { nombre: 'Elegir tamaño', estado: false, proyectoId: 2 },
            { nombre: 'Elegir fuente', estado: false, proyectoId: 3 },
            { nombre: 'dibujar dibujo', estado: true, proyectoId: 4 }
        ],
        tareasPorProyecto: null
    }
    
    const [state, dispatch] = useReducer(TareasReducer, initialState);


    const obtenerTareasProyecto = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    const agregarTarea = tarea => {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    return (
        <TareasContext.Provider
            value={{
                tareas: state.tareas,
                tareasPorProyecto: state.tareasPorProyecto,
                obtenerTareasProyecto,
                agregarTarea
            }}>
            {props.children}
        </TareasContext.Provider>
    );
};

export default TareasState;