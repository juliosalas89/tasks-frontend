import {
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREAS_PROYECTO,
    TAREA_ACTUAL,
    VALIDAR_FORMTAREA,
    EDITAR_TAREA
} from "../../types";


const tareasReducer = (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasPorProyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
            };
        case AGREGAR_TAREA:
            return {
                ...state,
                tareas: [action.payload, ...state.tareas],
                erorFormTarea: false,
            }
        case VALIDAR_FORMTAREA:
            return {
                ...state,
                erorFormTarea: action.payload
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea.id !== action.payload)
            }
        case ESTADO_TAREA:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea)
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaActual: action.payload,
                erorFormTarea: false
            }
        case EDITAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea),
                erorFormTarea: false,
                tareaActual: null
            }
        default:
            return state
    }
}

export default tareasReducer;