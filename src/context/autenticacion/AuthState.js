import React from 'react';
import { useReducer } from 'react';
import AuthContext from './AuthContext.js'
import authReducer from './authReducer.js';
import clienteAxios from '../../config/axios.js';
import tokenAuth from '../../config/tokenAuth.js';
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
        cargando: true,
        usuarioActual: null,
        mensajeUsuario: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios/', datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data //pasamos la respuesta pq ahí viene el token desde el back
            })
            setUsuarioActual(respuesta.data.token)
        } catch (error) {
            console.log(error.response.data.mensaje);
            const alerta = {
                msj: error.response.data.mensaje,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            setUsuarioActual(respuesta.data.token)

        } catch (error) {
            console.log(error.response.data.mensaje);
            const alerta = {
                msj: error.response.data.mensaje,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const setUsuarioActual = async token => {
        if (token) {
            //TODO: funcion para enviar el token en los headers de todos los req
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth')
            // console.log(respuesta.data.usuarioAutenticado)
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuarioAutenticado
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const cerrarSesion = ()=>{
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuarioActual: state.usuarioActual,
                mensajeUsuario: state.mensajeUsuario,
                cargando: state.cargando,
                iniciarSesion,
                registrarUsuario,
                setUsuarioActual,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;