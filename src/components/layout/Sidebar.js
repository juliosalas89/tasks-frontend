import React from 'react';
import ProjectsList from '../projects/ProjectsList';
import NewProject from '../projects/NewProject';

const Sidebar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NewProject></NewProject>
            <div className='projects'>
                <h2>Your Projects</h2>
                <ProjectsList></ProjectsList>
            </div>
        </aside>
    );
};

export default Sidebar;