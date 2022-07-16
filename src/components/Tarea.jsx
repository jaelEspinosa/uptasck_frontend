import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"



const Tarea = ({ tarea }) => {
    const {handleEditarModalTarea, handleModalEliminarTarea} = useProyectos()
    
    const { descripcion, nombre, prioridad, fechaEntrega, estado,  _id } = tarea
    return (
        <div className="border-b p-5 flex justify-between items-center flex-nowrap">
            <div>
               <p className="mb-2 text-xl">{nombre}</p>
               <div className="w-1/2">
                   <p className="mb-2 text-xs uppercase text-gray-600">{descripcion}</p>

               </div>
               <p className="mb-2 text-sm font-bold">Fecha: {formatearFecha(fechaEntrega)}</p>
               <p className="mb-2 text-sm">Prioridad: {prioridad}</p>
            </div>
          
            <div className="flex gap-2">
              <button
              onClick={()=> handleEditarModalTarea(tarea)}
              className="bg-indigo-600 hover:bg-indigo-700 trasition-colors px-4 py-3 text-white uppercase font-bold text-xs rounded-lg"
              >Editar</button>
              
              {estado ? <button
              className="bg-sky-600 hover:bg-sky-700 trasition-colors px-4 py-3 text-white uppercase font-bold text-xs rounded-lg"
              >Completa</button> :
              <button
              className="bg-gray-600 hover:bg-gray-700 trasition-colors px-4 py-3 text-white uppercase font-bold text-xs rounded-lg"
              >Incompleta</button>}
              
              <button
              onClick={()=>handleModalEliminarTarea(tarea)}
              className="bg-red-600 hover:bg-red-700 trasition-colors px-4 py-3 text-white uppercase font-bold text-xs rounded-lg"
              >Eliminar</button>
             
            </div>
        </div>
    )
}

export default Tarea