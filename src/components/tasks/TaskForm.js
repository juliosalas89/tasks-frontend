import React, { useContext, useState } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import TasksContext from '../../context/tasks/TasksContext';
import { v4 as uuidv4 } from "uuid"
import { useEffect } from 'react';

const TaskForm = () => {
    const [newTask, setNewTask] = useState({ name: '', state: false })
    const { name } = newTask;
    const { currentProject } = useContext(ProjectContext);
    const {
        tasks,
        addTask,
        getProjectTasks,
        taskFormError,
        validateTaskForm,
        currentTask,
        setCurrentTask,
        saveTaskChanges
    } = useContext(TasksContext);

    useEffect(() => {
        if (currentProject) getProjectTasks(currentProject._id);
        if (currentTask) setNewTask(currentTask)
        //eslint-disable-next-line
    }, [tasks, currentTask])

    if (!currentProject) return null;

    const handleChange = e => {
        const newData = {
            ...newTask,
            [e.target.name]: e.target.value
        };
        setNewTask(newData);
    };


    const prepareTask = e => {
        e.preventDefault();
        if (name.trim() === '') {
            validateTaskForm(true);
            return;
        }
        if (currentTask) {
            saveTaskChanges(newTask)
        } else {
            newTask.id = uuidv4();
            newTask.projectId = currentProject._id;
            addTask(newTask);
        }
        setNewTask({
            name: '',
            state: false
        })
    }

    const cancelEdit = () => {
        setCurrentTask(null);
        validateTaskForm(false);
        setNewTask({ name: '', state: false })
    }

    return (
        <div className='formulary'>
            <form onSubmit={prepareTask}>
                <div className='input-container'>
                    <input
                        type="text"
                        className='input-text'
                        placeholder='Task name... '
                        name='name'
                        onChange={handleChange}
                        value={name}
                    />
                    {currentTask ?
                        <button
                            onClick={cancelEdit}
                        >Cancel</button>
                        : null}
                </div>
                {
                    taskFormError ? <p className='message error'>Please type a task</p> : null
                }
                <div className='input-container'>
                    <input
                        type="submit"
                        className='btn btn-block btn-primario btn-submit'
                        value={currentTask ? 'Save Changes' : 'Add Task'}
                    />
                </div>
            </form>
        </div>
    );
};

export default TaskForm;