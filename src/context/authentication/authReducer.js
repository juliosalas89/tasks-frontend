import {
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OUT
} from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case SIGN_UP_SUCCESS:
            //guardamos el token que llega en el local storage
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                mensajeNuevoUsuario: null,
                loading: false,
                token: action.payload.token
            }
        case LOG_OUT:
        case LOGIN_ERROR:
        case SIGN_UP_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                currentUser: null,
                authenticated: null,
                userMessage: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                currentUser: action.payload,
                authenticated: true,
                loading: false
            }
        default:
            return state;
    }
}

export default authReducer;