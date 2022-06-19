import React, { useReducer } from 'react';
import { v4 as uuidv4 } from "uuid"

//importamos el context creado en proyectoContext
import proyectoContext from './proyectoContext';
//importamos el Reducer creado en proyectoReducer
import proyectoReducer from './proyectoReducer';
//Ahora importamos los types que vamos creando en la carpeta types, en el archivo index.js (le pusimos ese nombre para no tener que importar con el nombre del archivo, tambien podriamos haberle llamado de otra forma)
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    ERROR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';



//Creamos el Provider
const ProyectoState = props => {
    const proyectos = [
        { id: 1, nombre: 'tienda virtual' },
        { id: 2, nombre: 'facturacion' },
        { id: 3, nombre: 'login' }
    ]
    //definimos el estado inicial
    const initialState = {
        proyectos: [],
        formulario: false,
        errorform: false,
        proyecto: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //funciones para el CRUD 
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    const agregarProyecto = proyecto=> {
        proyecto.id= uuidv4();
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    const formularioVaico = () => {
        dispatch({
            type: ERROR_FORMULARIO
        })
    }

    const proyectoActual = poryecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: poryecto
        })
    }

    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    //por ultimo creamos el return del context. en el value pasamos el state inicial como se ve aquí:
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorform: state.errorform,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                formularioVaico,
                proyectoActual,
                eliminarProyecto
            }}>
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;