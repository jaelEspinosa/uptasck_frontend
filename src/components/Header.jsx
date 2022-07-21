import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./Busqueda"


const Header = () => {
    const navigate = useNavigate()
    const {handleBuscador,cerrarSesionProyectos} = useProyectos()
    const {cerrarSesionAuth}=useAuth()
    const logOut = ()=>{
        localStorage.removeItem('token')
        cerrarSesionProyectos()
        cerrarSesionAuth
        navigate('/')
    }
    return (
        <header className="px-4 py-5 bg-white border-b">
        
            <div className="md:flex md:justify-between">
            
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5">
                    UpTask
                </h2>
              
                <div className="flex flex-col md:flex-row items-center gap-5">
                <button
                      onClick={handleBuscador}
                      className="font-bold uppercase" 
                      type="button">Buscar Proyecto</button>
                    <Link 
                        to='/proyectos'
                        className="font-bold uppercase"    
                        >proyectos</Link>
                    <button
                          type="button"
                          className="rounded-xl bg-sky-600 hover:bg-sky-700 
                                     transition-colors cursor-pointer text-white font-bold py-2 px-3"
                          onClick={()=>logOut()}
                         
                    >Cerrar Sesión</button>
                     <Busqueda />
                </div>
            </div>
        </header>
    )
}

export default Header