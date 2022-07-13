import { Link, useNavigate } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"


const Header = () => {
    const navigate = useNavigate()
    const {setProyectos} = useProyectos()
    
    const logOut = ()=>{
        localStorage.clear()
        
        navigate('/')
    }
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center">
                    UpTask
                </h2>
                <input
                    type='search'
                    placeholder="Buscar proyecto"
                    className="rounded-lg lg:w-96 block p-2 border"
                />
                <div className="flex items-center gap-5">
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
                </div>
            </div>
        </header>
    )
}

export default Header