import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            //guardamos el token que llega en el local storage
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensajeNuevoUsuario: null,
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                usuarioActual: null,
                autenticado: null,
                mensajeUsuario: action.payload,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                usuarioActual: action.payload,
                autenticado: true,
                cargando: false
            }
        default:
            return state;
    }
}

export default authReducer;