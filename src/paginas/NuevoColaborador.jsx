import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import FormularioColaborador from "../components/FormularioColaborador"

import useProyectos from "../hooks/useProyectos"


const NuevoColaborador = () => {
  const { proyecto, obtenerProyecto, alerta, obtenerUsuarios } = useProyectos()
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)
    obtenerUsuarios()
  }, [])
  if (!proyecto._id) return <Alerta alerta={alerta} />
  return (
    <div>
      <h1 className="text-4xl font-black">Añadir colaborador(a)</h1>
      <h2 className="text-3xl font-black">{proyecto.nombre}</h2>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
     
    </div>
  )
}

export default NuevoColaborador