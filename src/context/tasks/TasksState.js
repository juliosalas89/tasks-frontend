import React, { useReducer } from 'react';
import TasksContext from './TasksContext';
import tasksReducer from './tasksReducer';
import axiosClient from '../../config/axios.js'
import {
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    PROJECT_TASKS,
    CURRENT_TASK,
    VALIDATE_TASK_FORM
} from '../../types';


const TasksState = (props) => {
    const initialState = {
        projectTasks: [],
        taskFormError: false,
        currentTask: null
    }

    const [state, dispatch] = useReducer(tasksReducer, initialState);


    const getProjectTasks = async projectId => {
        try {
            const response = await axiosClient.get('/api/task', { params: { projectId } });
            dispatch({
                type: PROJECT_TASKS,
                payload: response.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addTask = async task => {
        try {
            const response = await axiosClient.post('/api/task', task)
            dispatch({
                type: ADD_TASK,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validateTaskForm = booleano => {
        dispatch({
            type: VALIDATE_TASK_FORM,
            payload: booleano
        })
    }

    const deleteTask = async task => {
        try {
            await axiosClient.delete(`/api/task/${task._id}`, { params: { projectId: task.projectId } });
        dispatch({
            type: DELETE_TASK,
            payload: task._id
        })
        } catch (error) {
            console.log(error)
        }

    }

    const setCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    const saveTaskChanges = async task => {
        try {
            const response = await axiosClient.put(`/api/task/${task._id}`, task);
            console.log(response.data)
            dispatch({
                type: EDIT_TASK,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TasksContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskFormError: state.taskFormError,
                currentTask: state.currentTask,
                getProjectTasks,
                addTask,
                validateTaskForm,
                deleteTask,
                setCurrentTask,
                saveTaskChanges
            }}>
            {props.children}
        </TasksContext.Provider>
    );
};

export default TasksState;