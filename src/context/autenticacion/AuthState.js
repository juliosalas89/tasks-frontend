import React from 'react';
import { useReducer } from 'react';
import AuthContext from './AuthContext.js'
import authReducer from './authReducer.js';
import clienteAxios from '../../config/axios.js'
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    //vamos a iniciar nuestro state con un token, que va a estar almacenado en local storage
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios/', datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data //pasamos la respuesta pq ahí viene el token desde el back
            })

        } catch (error) {
            // console.log(error.response.data);
            const alerta = {
                msj: error.response.data,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;