import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import TasksContext from '../../context/tasks/TasksContext';

const Project = ({ project }) => {
    const { setCurrentProject } = useContext(ProjectContext);
    const { getProjectTasks } = useContext(TasksContext);

    const selectProject = project => {
        setCurrentProject(project);
        getProjectTasks(project._id)
    }


    return (
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => selectProject(project)}
            >{project.name}</button>
        </li>
    );
};

export default Project;