import React from 'react';
import { useContext } from 'react';
import TasksContext from '../../context/tasks/TasksContext';

const Task = ({ task }) => {
    const { deleteTask, saveTaskChanges, setCurrentTask } = useContext(TasksContext)

    const handleEstadoTarea = booleano => {
        task.state = booleano;
        saveTaskChanges(task)
    }

    return (
        <li className='task shadow'>
            <p>{task.name}</p>
            <div className='state'>
                {
                    task.state ? (
                        <button
                            type='button'
                            className='complete'
                            onClick={() => handleEstadoTarea(false)}
                        >Complete</button>
                    ) : (
                        <button
                            type='button'
                            className='incomplete'
                            onClick={() => handleEstadoTarea(true)}
                        >Incomplete</button>
                    )
                }
            </div>
            <div className='actions'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => setCurrentTask(task)}
                >Edit task</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={()=> deleteTask(task)}
                >Delete</button>
            </div>
        </li>
    );
};

export default Task;