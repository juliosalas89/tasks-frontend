import { Fragment } from "react";
import Login from "./components/auth/Login";
import { Routes, Route } from "react-router-dom";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import ProyectoState from './context/proyectos/PoryectoState'

function App() {


  return (
    <ProyectoState>
      <Fragment>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/nueva-cuenta' element={<NuevaCuenta></NuevaCuenta>}></Route>
          <Route path='/proyectos' element={<Proyectos></Proyectos>}></Route>
        </Routes>
      </Fragment>
    </ProyectoState>
  );
}

export default App;
