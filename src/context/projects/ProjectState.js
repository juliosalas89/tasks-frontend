import React, { useReducer } from 'react';
import axiosClient from '../../config/axios.js';

import ProjectContext from './ProjectContext.js';
import projectReducer from './projectReducer.js';
import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_ERROR,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';



const ProyectoState = props => {
    const initialState = {
        projects: [],
        formulary: false,
        errorForm: false,
        currentProject: null,
        message: null
    }

    const [state, dispatch] = useReducer(projectReducer, initialState)

    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    const getProjects = async () => {
        try {
            const response = await axiosClient.get('api/project');
            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            })
        } catch (error) {
            const alert = {
                message: 'There was an error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    const addProject = async project=> {
        try {
            const response = await axiosClient.post('/api/project', project);
            dispatch({
                type: ADD_PROJECT,
                payload: response.data.project
            })
        } catch (error) {
            const alert = {
                message: 'There was an error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    const emptyForm = () => {
        dispatch({
            type: FORM_ERROR
        })
    }

    const setCurrentProject = poryecto => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: poryecto
        })
    }

    const deleteProject = async projectId => {
        try {
            await axiosClient.delete(`api/project/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                message: 'Hubo un error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                formulary: state.formulary,
                errorForm: state.errorForm,
                currentProject: state.currentProject,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                emptyForm,
                setCurrentProject,
                deleteProject
            }}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProyectoState;