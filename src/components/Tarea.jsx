import { formatearFecha } from "../helpers/formatearFecha"
import useAdmin from "../hooks/useAdmin"
import useProyectos from "../hooks/useProyectos"



const Tarea = ({ tarea }) => {
    const {handleEditarModalTarea, handleModalEliminarTarea, completarTarea,proyecto} = useProyectos()
    const admin = useAdmin()
    const { descripcion, nombre, prioridad, fechaEntrega, estado,  _id } = tarea
    
    return (
        <div className="border-b p-5 flex justify-between items-center flex-nowrap">
            <div className="flex flex-col items-start">
               <p className="mb-2 text-xl">{nombre}</p>
               <div className="w-1/2">
                   <p className="mb-2 text-xs uppercase text-gray-600">{descripcion}</p>

               </div>
               <p className="mb-2 text-sm font-bold">Fecha: {formatearFecha(fechaEntrega)}</p>
               <p className="mb-2 text-sm">Prioridad: {prioridad}</p>
              {estado && <p className="text-xs bg-green-600 rounded-lg p-1 font-bold uppercase
                                       text-white ">
                    Completada por :{tarea.completado?.nombre}</p>}
              
            </div>
          
            <div className="flex gap-2 flex-col lg:flex-row ">
             {admin &&  <button
              onClick={()=> handleEditarModalTarea(tarea)}
              className="bg-indigo-600 hover:bg-indigo-700 trasition-colors px-4 py-3 text-white uppercase font-bold text-xs rounded-lg"
              >Editar</button>}
              
              <button
              onClick={()=> completarTarea(_id)}
              className={`${estado ? 'bg-gray-300 hover:bg-gray-400': 'bg-gray-600 hover:bg-gray-700'} px-4 py-3
                                     text-white uppercase font-bold text-sm rounded-lg`}
              >{estado ? 'finalizada': 'Pendiente'}</button> 
             
              
             {admin && <button
              onClick={()=>handleModalEliminarTarea(tarea)}
              className="bg-red-600 hover:bg-red-700 trasition-colors px-4 py-3 text-white uppercase font-bold text-xs rounded-lg"
              >Eliminar</button>}
             
            </div>
        </div>
    )
}

export default Tarea