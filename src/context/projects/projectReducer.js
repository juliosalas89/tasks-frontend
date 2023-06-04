import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_ERROR,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';

const projectReducer = (state, action) => {
    switch (action.type) {
        case PROJECT_FORM:
            return {
                ...state,
                formulary: true,
                errorForm: false
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                formulary: false,
                errorForm: false,
                project: action.payload
            }
        case FORM_ERROR:
            return {
                ...state,
                errorForm: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                currentProject: action.payload
            }
            case DELETE_PROJECT:
                return {
                    ...state,
                    projects: state.projects.filter(project => project._id !== action.payload),
                    currentProject: null
                }
            case PROJECT_ERROR:
                return {
                    ...state,
                    message: action.payload
                }
        default:
            return state
    }
}

export default projectReducer;