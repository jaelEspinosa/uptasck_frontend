import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Proyecto from './components/Proyecto'
import { AuthProvider } from './context/AuthProvider'
import { ProyectosProvider } from './context/ProyectosProvider'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import EditarProyecto from './paginas/EditarProyecto'
import Login from './paginas/Login'
import NuevoColaborador from './paginas/NuevoColaborador'
import NuevoPassword from './paginas/NuevoPassword'
import NuevoProyecto from './paginas/NuevoProyecto'
import OlvidePassword from './paginas/OlvidePassword'
import Proyectos from './paginas/Proyectos'
import Registrar from './paginas/Registrar'


function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/proyectos' element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path='crear-proyecto' element={<NuevoProyecto />} />
              <Route path='nuevo-colaborador/:id' element={<NuevoColaborador />} />
              <Route path=':id' element={<Proyecto />} />
              <Route path='editar/:id' element={<EditarProyecto />} />

            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
