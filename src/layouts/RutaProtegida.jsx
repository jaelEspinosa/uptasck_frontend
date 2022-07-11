import {Outlet, Navigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import useAuth from '../hooks/useAuth'
import Proyectos from '../paginas/Proyectos'

const RutaProtegida = () => { 
    const{auth, cargando} = useAuth()
  
    if(cargando){
        return (
            <Spinner />
        )
    }
    
  return (
    <>
       
      {auth._id ? <Outlet /> :  <Navigate to='/' />}
     
    </>
    
  )
}

export default RutaProtegida