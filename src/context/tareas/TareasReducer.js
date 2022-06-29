import {
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
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
                tareasPorProyecto: action.payload
            };
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasPorProyecto: [action.payload, ...state.tareasPorProyecto],
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
                tareasPorProyecto: state.tareasPorProyecto.filter(tarea => tarea._id !== action.payload)
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
                tareasPorProyecto: state.tareasPorProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                erorFormTarea: false,
                tareaActual: null
            }
        default:
            return state
    }
}

export default tareasReducer;