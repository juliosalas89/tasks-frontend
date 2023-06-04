import React, { Fragment, useContext } from 'react';
import Task from './Task.js';
import ProjectContext from '../../context/projects/ProjectContext.js';
import TasksContext from '../../context/tasks/TasksContext.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const TasksList = () => {

    const { currentProject, deleteProject } = useContext(ProjectContext);
    const { projectTasks } = useContext(TasksContext);

    if (!currentProject) return <h2>Select a project</h2>



    return (
        <Fragment>
            <h2>Project: {currentProject.name}</h2>

            <ul className='taks-list'>
                {
                    projectTasks.length === 0 ? (
                        <li className='task'><p>No tasks yet...</p></li>
                    ) : <TransitionGroup>
                        {projectTasks.map(task => (
                            <CSSTransition
                                key={task._id}
                                timeout={250}
                                classNames='task'
                            >
                                <Task task={task}></Task>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type='button'
                className='btn incomplete'
                onClick={() => deleteProject(currentProject._id)}
            >Delete this Project &times;</button>
        </Fragment>
    );
};

export default TasksList;