import React, { useReducer } from 'react';
import TareasContext from './TareasContext';
import tareasReducer from './tareasReducer';
import clienteAxios from '../../config/axios.js'
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
        tareasPorProyecto: [],
        erorFormTarea: false,
        tareaActual: null
    }

    const [state, dispatch] = useReducer(tareasReducer, initialState);


    const obtenerTareasProyecto = async proyectoId => {
        try {
            const respuesta = await clienteAxios.get('/api/tareas', { params: { proyectoId } });
            dispatch({
                type: TAREAS_PROYECTO,
                payload: respuesta.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
    }

    const agregarTarea = async tarea => {
        try {
            const respuesta = await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: respuesta.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validarFormTarea = booleano => {
        dispatch({
            type: VALIDAR_FORMTAREA,
            payload: booleano
        })
    }

    const eliminarTarea = async tarea => {
        try {
            await clienteAxios.delete(`/api/tareas/${tarea._id}`, { params: { proyectoId: tarea.proyectoId } });
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tarea._id
        })
        } catch (error) {
            console.log(error)
        }

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