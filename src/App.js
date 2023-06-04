import { Fragment } from "react";
import Login from "./components/auth/Login";
import { Routes, Route} from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import ProjectState from './context/projects/ProjectState'
import TasksState from "./context/tasks/TasksState";
import AlertsState from "./context/alerts/AlertsState";
import AuthState from "./context/authentication/AuthState";
import Projects from "./components/projects/Projects";



function App() {


  return (
    <AuthState>
      <AlertsState>
        <TasksState>
          <ProjectState>
            <Fragment>
              <Routes>
                <Route path='/' element={<Login></Login>}></Route>
                <Route path='/new-account' element={<SignUp></SignUp>}></Route>
                <Route path='/projects' element={<Projects></Projects>}></Route>
              </Routes>
            </Fragment>
          </ProjectState>
        </TasksState>
      </AlertsState>
    </AuthState>
  );
}

export default App;
