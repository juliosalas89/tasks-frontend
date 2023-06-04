import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/authentication/AuthContext';
import UserBar from '../layout/UserBar';
import Sidebar from '../layout/Sidebar';
import TaskForm from '../tasks/TaskForm';
import TasksList from '../tasks/TasksList';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const { setCurrentUser, token, authenticated, loading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (token) setCurrentUser(token);
        if (!token) navigate('/');
        if (!authenticated && !loading) navigate('/');
        //eslint-disable-next-line
    }, [loading, authenticated])



    return (
        <div className='app-container'>
            <Sidebar></Sidebar>
            <div className='main-section'>
                <UserBar></UserBar>
                <main>
                    <TaskForm></TaskForm>
                    <div className='tasks-container'>
                        <TasksList></TasksList>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;