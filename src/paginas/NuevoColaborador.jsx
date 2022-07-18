import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import FormularioColaborador from "../components/FormularioColaborador"
import Spinner from "../components/Spinner"
import useProyectos from "../hooks/useProyectos"


const NuevoColaborador = () => {
  const { proyecto, colaborador, cargando,agregarColaborador, obtenerProyecto, alerta } = useProyectos()
       const params = useParams ()
       
       useEffect(()=>{
          obtenerProyecto(params.id)
       },[])
  if(!proyecto._id) return <Alerta alerta = {alerta}/>
  return (
    <div>
      <h1 className="text-4xl font-black">Añadir colaborador(a)</h1>
      <h2 className="text-3xl font-black">{proyecto.nombre}</h2>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
      {cargando ? <Spinner /> : colaborador?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white p-10 px-5 md:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 text-2xl font-bold">Resultado</h2>
            <div className="flex justify-between items-center">

              <p>{colaborador.nombre}</p>

              <button
                onClick={()=>agregarColaborador({
                  email:colaborador.email
                })}
                type='button'
                className="bg-slate-500 hover:bg-slate-600 
                             transition-colors py-2 px-2 rounded-md text-white"
              >Agregar al Proyecto</button>

            </div>
          </div>

        </div>)

      }



    </div>
  )
}

export default NuevoColaborador