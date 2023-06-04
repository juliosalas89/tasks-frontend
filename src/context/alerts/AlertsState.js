import React, { useReducer } from "react"
import { SHOW_TASK, HIDE_TASK } from "../../types/index.js"
import AlertsContext from "./AlertsContext.js"
import alertsReducer from './alertsReducer.js'

const AlertsState = (props) => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertsReducer, initialState)

    const setAlert = (message, category) => {
        dispatch({
            type: SHOW_TASK,
            payload: {
                message,
                category
            }
        })

        setTimeout(() => {
            dispatch({
                type: HIDE_TASK
            })
        }, 2800)
    }

    return (
        <AlertsContext.Provider
            value={{
                alert: state.alert,
                setAlert
            }}
        >
            {props.children}
        </AlertsContext.Provider>
    )

}

export default AlertsState;