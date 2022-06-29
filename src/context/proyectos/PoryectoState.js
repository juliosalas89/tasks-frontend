import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios.js';

//importamos el context creado en proyectoContext
import ProyectoContext from './ProyectoContext.js';
//importamos el Reducer creado en proyectoReducer
import proyectoReducer from './proyectoReducer.js';
//Ahora importamos los types que vamos creando en la carpeta types, en el archivo index.js (le pusimos ese nombre para no tener que importar con el nombre del archivo, tambien podriamos haberle llamado de otra forma)
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    ERROR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';



//Creamos el Provider
const ProyectoState = props => {
    //definimos el estado inicial
    const initialState = {
        proyectos: [],
        formulario: false,
        errorform: false,
        proyectoActual: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //funciones para el CRUD 
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {
        try {
            const respuesta = await clienteAxios.get('api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: respuesta.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msj: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const agregarProyecto = async proyecto=> {
        try {
            const respuesta = await clienteAxios.post('/api/proyectos', proyecto);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data.proyecto
            })
        } catch (error) {
            const alerta = {
                msj: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const formularioVaico = () => {
        dispatch({
            type: ERROR_FORMULARIO
        })
    }

    const setProyectoActual = poryecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: poryecto
        })
    }

    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msj: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //por ultimo creamos el return del context. en el value pasamos el state inicial como se ve aquí:
    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorform: state.errorform,
                proyectoActual: state.proyectoActual,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                formularioVaico,
                setProyectoActual,
                eliminarProyecto
            }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;