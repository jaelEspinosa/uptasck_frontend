import Alerta from "../components/Alerta"
import PreviewProyecto from "../components/PreviewProyecto"
import Spinner from "../components/Spinner"
import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"


const Proyectos = () => {
  const {proyectos, cargando, alerta} = useProyectos()
  const {auth} = useAuth()
  
  
  return (
    <>
    {cargando ? <Spinner /> : 
    <>
    <h1 className="text-4xl font-black">Proyectos: {proyectos?.length}</h1>
    {alerta.msg && <Alerta alerta={alerta}/>}
    <div className="block bg-white shadow mt-10 rounded-lg p-5 
                    overflow-y-scroll scrollbar-thumb-transparent scrollbar-thin
                   hover:scrollbar-thumb-sky-700 scrollbar-thumb-rounded-full h-96 transition-colors">
      {proyectos.length ? 
      proyectos.map((proyecto,index) =>(
        <PreviewProyecto key={proyecto._id} proyecto = {proyecto} index = {index+1}/>
      ))
      :<p className="text-3xl 
            text-center text-gray-600 uppercase">{auth.nombre}, No tienes proyectos aún</p>}
    </div>
    {Alerta.msg && <Alerta alerta = {alerta}/>}
    </>
    }
    
    </>
  )
}

export default Proyectos