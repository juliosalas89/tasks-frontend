import React, { useContext, useEffect } from 'react';
import Project from './Project';
import ProjectContext from '../../context/projects/ProjectContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertsContext from '../../context/alerts/AlertsContext';
import AuthContext from '../../context/authentication/AuthContext';

const ProjectsList = () => {
    const { message, projects, getProjects, setCurrentProject } = useContext(ProjectContext);
    const { alert, setAlert } = useContext(AlertsContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        if(message) setAlert(message.message, message.cetegory);
        //eslint-disable-next-line
    }, [message])

    useEffect(() => {
        getProjects();
        setCurrentProject(null);
        //eslint-disable-next-line
    }, [currentUser])

    if (!projects.length) return <p>No projects yet, create a project to start...</p>;

    return (
        <ul className='projects-list'>
            {alert ? (<div className={`alert ${alert.cetegory}`}>{alert.message}</div>) : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={250}
                        classNames='project'
                    >
                        <Project project={project}></Project>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ProjectsList;