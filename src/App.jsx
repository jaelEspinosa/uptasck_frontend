import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Login from './paginas/Login'
import NuevoPassword from './paginas/NuevoPassword'
import OlvidePassword from './paginas/OlvidePassword'
import Proyectos from './paginas/Proyectos'
import Registrar from './paginas/Registrar'

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
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

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
