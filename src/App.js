import { Fragment } from "react";
import Login from "./components/auth/Login";
import { Routes, Route} from "react-router-dom";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import ProyectoState from './context/proyectos/PoryectoState'
import TareasState from "./context/tareas/TareasState";
import AlertaState from "./context/alertas/AlertasState";
import AuthState from "./context/autenticacion/AuthState";
import Proyectos from "./components/proyectos/Proyectos";



function App() {


  return (
    <AuthState>
      <AlertaState>
        <TareasState>
          <ProyectoState>
            <Fragment>
              <Routes>
                <Route path='/' element={<Login></Login>}></Route>
                <Route path='/nueva-cuenta' element={<NuevaCuenta></NuevaCuenta>}></Route>
                <Route path='/proyectos' element={<Proyectos></Proyectos>}></Route>
              </Routes>
            </Fragment>
          </ProyectoState>
        </TareasState>
      </AlertaState>
    </AuthState>
  );
}

export default App;
