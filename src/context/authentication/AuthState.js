import React from 'react';
import { useReducer } from 'react';
import AuthContext from './AuthContext.js'
import authReducer from './authReducer.js';
import axiosClient from '../../config/axios.js';
import tokenAuth from '../../config/tokenAuth.js';
import {
    SIGN_UP_SUCCESS,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OUT
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        loading: true,
        currentUser: null,
        userMessage: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registerUser = async datos => {
        try {
            const response = await axiosClient.post('/api/user/', datos)
            dispatch({
                type: SIGN_UP_SUCCESS,
                payload: response.data 
            })
            setCurrentUser(response.data.token)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const logIn = async datos => {
        try {
            const response = await axiosClient.post('/api/auth', datos);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })

            setCurrentUser(response.data.token)

        } catch (error) {
            console.log(error.response.data.message)
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    message: error.response.data.message,
                    category: 'alert-error'
                } 
            })
        }
    }

    const setCurrentUser = async token => {
        token && tokenAuth(token)
        
        try {
            const response = await axiosClient.get('/api/auth')
            console.log('setCurrentUser', response)
            dispatch({
                type: GET_USER,
                payload: response.data.authenticatedUser
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    message: error.response.data.message,
                    category: 'alert-error'
                } 
            })
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                currentUser: state.currentUser,
                userMessage: state.userMessage,
                loading: state.loading,
                logIn,
                registerUser,
                setCurrentUser,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;