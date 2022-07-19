import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Sidebar = () => {
  const {auth}=useAuth()
  return (
    
    <aside className="md:1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 border-r-2 shadow-sm">
       <p className="text-xl font-bold">Hola: {auth.nombre}</p>
       <Link 
           className="bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer w-full p-3 text-white 
                      uppercase rounded-xl font-bold mt-5 block text-center"
           to= "crear-proyecto"
           >
           Nuevo Proyecto
       </Link>
    </aside>
  )
}

export default Sidebar