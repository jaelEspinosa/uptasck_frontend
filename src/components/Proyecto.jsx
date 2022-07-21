import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'

import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import Colaborador from './Colaborador'
import ModalEliminarColaborador from './ModalEliminarColaborador'
import ModalEliminarTarea from './ModalEliminarTarea'
import ModalFormularioTarea from './ModalFormulariotarea'
import Spinner from './Spinner'
import Tarea from './Tarea'
import io from 'socket.io-client'

let socket;


const Proyecto = () => {
    const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, 
            SubmitTareasProyecto,eliminarTareaProyecto, actualizarTareaProyecto,cambiarEstadoTarea} = useProyectos()
    const params = useParams()
    
    const admin = useAdmin()

    useEffect(() => {

        obtenerProyecto(params.id)

    }, [])
    useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL)
      socket.emit('abrir proyecto', params.id)
    },[])
    
    useEffect(()=>{
        socket.on('tarea agregada', tareaNueva =>{
            
            if (tareaNueva.proyecto === proyecto._id){
                SubmitTareasProyecto(tareaNueva)

            }
        });
        socket.on('tarea eliminada', tareaEliminada =>{
            
            if (tareaEliminada.proyecto === proyecto._id){
                eliminarTareaProyecto(tareaEliminada)

            }
        });
        socket.on('tarea actualizada', tareaActualizada =>{
            
            if (tareaActualizada.proyecto._id === proyecto._id){
                actualizarTareaProyecto(tareaActualizada)

            }
        });
        socket.on('nuevo estado', nuevoEstadoTarea =>{
            
            if (nuevoEstadoTarea.proyecto._id === proyecto._id){
                cambiarEstadoTarea(nuevoEstadoTarea)

            }
        });
    })
    const { nombre } = proyecto
    
    
    return (
        
            <>
                {cargando ? <Spinner /> :
                    <>
                          
                        <div className='flex justify-between '>
                        
                            <h1 className='font-black text-4xl'>{nombre}</h1>
                            
                            {admin && <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <Link
                                    className='uppercase font-bold text-gray-400 hover:text-gray-600'
                                    to={`/proyectos/editar/${params.id}`} >Editar</Link>
                            </div>}
                        </div>
                        {admin && <button
                            onClick={handleModalTarea}
                            type='button'
                            className='text-sm px-5 py-3 w-full md:w-auto mt-5 flex gap-2 items-center
                                   rounded-lg uppercase font-bold bg-sky-500 hover:bg-sky-700 transition-colors
                                    text-white text-center'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Nueva Tarea
                        </button>}
                        {alerta?.msg && <Alerta alerta={alerta} />} 
                        <p className='font-bold text-xl mt-10 text-gray-800'>Tareas del Proyecto: {proyecto.tareas?.length}</p>
                        <div className='bg-white shadow mt-10 rounded-lg  overflow-y-scroll scrollbar-thumb-transparent scrollbar-thin
                                        hover:scrollbar-thumb-sky-700 scrollbar-thumb-rounded-full h-96 transition-colors'>
                            {proyecto.tareas?.length ? proyecto.tareas?.map(tarea => (
                                <Tarea key={tarea._id} tarea={tarea} />
                            )) :
                                <p className='text-center my-5 p-10'>No hay tareas definidas en este proyecto</p>
                            }

                        </div>
                        {admin &&
                            <>
                                <div className='flex items-center justify-between mt-10'>
                                    <p className='font-bold text-xl  text-gray-800'>Colaboradores</p>
                                    <Link
                                        className='text-gray-400 hover:text-gray-600 uppercase font-bold'
                                        to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>
                                        AGREGAR
                                    </Link>
                                </div>
                                <div className='bg-white shadow mt-10 rounded-lg'>
                                    {proyecto.colaboradores?.length  ? proyecto.colaboradores?.map(colaborador => (
                                        <Colaborador key={colaborador._id} colaborador={colaborador} />
                                    )) :
                                        <p className='text-center my-5 p-10'>No hay colaboradores definidas en este proyecto</p>
                                    }
                                </div>
                            </>
                        }
                        <ModalFormularioTarea />
                        <ModalEliminarTarea />
                        <ModalEliminarColaborador />

                        <div className='my-5'>

                            {alerta?.msg && <Alerta alerta={alerta} />}

                        </div>
                    </>

                }
            </>
        )
}

export default Proyecto