import { 
    SHOW_TASK,
    HIDE_TASK
} from '../../types'


const alertsReducer = (state, action) => {
    switch(action.type) {
        case SHOW_TASK:
            return {
                alert: action.payload
            }
        case HIDE_TASK:
            return {
                alert: null
            }
        default:
            return state;
    }
}

export default alertsReducer