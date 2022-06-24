import React, { useReducer } from "react"
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types/index.js"
import AlertasContext from "./AlertasContext.js"
import alertasReducer from './alertasReducer.js'

const AlertasState = (props) => {
    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertasReducer, initialState)

    const setAlerta = (msj, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msj,
                categoria
            }
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 2800)
    }

    return (
        <AlertasContext.Provider
            value={{
                alerta: state.alerta,
                setAlerta
            }}
        >
            {props.children}
        </AlertasContext.Provider>
    )

}

export default AlertasState;