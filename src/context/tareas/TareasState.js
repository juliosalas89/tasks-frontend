import React, { useReducer } from 'react';
import TareasContext from './TareasContext';
import tareasReducer from './tareasReducer'
import {
    AGREGAR_TAREA,
    EDITAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREAS_PROYECTO,
    TAREA_ACTUAL,
    VALIDAR_FORMTAREA
} from '../../types';


const TareasState = (props) => {
    const initialState = {
        tareas: [
            {id: 1, nombre: 'Elegir color', estado: true, proyectoId: 1 },
            {id: 2, nombre: 'Elegir tamaño', estado: false, proyectoId: 2 },
            {id: 3, nombre: 'Elegir fuente', estado: false, proyectoId: 3 },
            {id: 4, nombre: 'dibujar dibujo', estado: true, proyectoId: 4 },
            {id: 5, nombre: 'Elegir color', estado: true, proyectoId: 1 },
            {id: 6, nombre: 'Elegir tamaño', estado: false, proyectoId: 2 },
            {id: 7, nombre: 'Elegir fuente', estado: false, proyectoId: 3 },
            {id: 8, nombre: 'dibujar dibujo', estado: true, proyectoId: 4 },
            {id: 9, nombre: 'Elegir color', estado: true, proyectoId: 1 },
            {id: 10, nombre: 'Elegir tamaño', estado: false, proyectoId: 2 },
            {id: 11, nombre: 'Elegir fuente', estado: false, proyectoId: 3 },
            {id: 12, nombre: 'dibujar dibujo', estado: true, proyectoId: 4 },
            {id: 13, nombre: 'Elegir color', estado: true, proyectoId: 1 },
            {id: 14, nombre: 'Elegir tamaño', estado: false, proyectoId: 2 },
            {id: 15, nombre: 'Elegir fuente', estado: false, proyectoId: 3 },
            {id: 16, nombre: 'dibujar dibujo', estado: true, proyectoId: 4 }
        ],
        tareasPorProyecto: [],
        erorFormTarea: false,
        tareaActual: null
    }

    const [state, dispatch] = useReducer(tareasReducer, initialState);


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

    const validarFormTarea = booleano => {
        dispatch({
            type: VALIDAR_FORMTAREA,
            payload: booleano
        })
    }

    const eliminarTarea = tareaId => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tareaId
        })
    }

    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    const setTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const guardarCambiosTarea = tarea => {
        dispatch({
            type: EDITAR_TAREA,
            payload: tarea
        })
    }

    return (
        <TareasContext.Provider
            value={{
                tareas: state.tareas,
                tareasPorProyecto: state.tareasPorProyecto,
                erorFormTarea: state.erorFormTarea,
                tareaActual: state.tareaActual,
                obtenerTareasProyecto,
                agregarTarea,
                validarFormTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                setTareaActual,
                guardarCambiosTarea
            }}>
            {props.children}
        </TareasContext.Provider>
    );
};

export default TareasState;