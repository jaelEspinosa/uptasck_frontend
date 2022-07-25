import React from 'react'
import useProyectos from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {
    const {nombre, email}= colaborador
    const {handleModalEliminarColaborador} = useProyectos()
  return (
    <div className='border-b p-5 flex justify-between'>

    <div>
      <p>{nombre}</p>
      <p className='text-xs md:text-sm text-gray-700'>{email}</p>
    </div>
    

    <div>
    <button
         onClick={() => handleModalEliminarColaborador(colaborador)}
         type='button'
         className='bg-red-600 px-4 py-3 text-white uppercase font-black text-xs md:text-sm rounded-lg'   
    >Eliminar</button>

    </div>
    
  
    
    
    
    
    </div>
  )
}

export default Colaborador