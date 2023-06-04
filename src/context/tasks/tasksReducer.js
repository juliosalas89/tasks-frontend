import {
    ADD_TASK,
    DELETE_TASK,
    PROJECT_TASKS,
    CURRENT_TASK,
    VALIDATE_TASK_FORM,
    EDIT_TASK
} from "../../types";


const tareasReducer = (state, action) => {
    switch (action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.payload
            };
        case ADD_TASK:
            return {
                ...state,
                projectTasks: [action.payload, ...state.projectTasks],
                taskFormError: false,
            }
        case VALIDATE_TASK_FORM:
            return {
                ...state,
                taskFormError: action.payload
            }
        case DELETE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        case CURRENT_TASK:
            return {
                ...state,
                currentTask: action.payload,
                taskFormError: false
            }
        case EDIT_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task),
                taskFormError: false,
                currentTask: null
            }
        default:
            return state
    }
}

export default tareasReducer;