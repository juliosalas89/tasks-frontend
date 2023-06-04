import React, { Fragment, useContext, useState } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';


const NewProject = () => {
    const [project, setProject] = useState({ name: '' })

    const projectContext = useContext(ProjectContext);
    const { formulary, errorForm, showForm, addProject, emptyForm } = projectContext;

    const { name } = project;

    const handleChange = e => {
        const newData = {
            ...project,
            [e.target.name]: e.target.value
        };
        setProject(newData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!name) return emptyForm();

        addProject(project);
        setProject({ name: '' })
    }

    return (
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primary'
                onClick={showForm}
            >New Project</button>
            {formulary ? (
                <form
                    className='new-project-from'
                    onSubmit={handleSubmit}
                >
                    {errorForm ? <p className='message error'>Please type project name</p> : null}
                    <input
                        type="text"
                        className='input-text'
                        placeholder='Project name'
                        name='name'
                        onChange={handleChange}
                        value={name}
                    />
                    <input
                        type="submit"
                        className='btn btn-primario btn-block'
                        value='Add Project'
                    />
                </form>
            ) : null
            }
        </Fragment>
    );
};

export default NewProject;