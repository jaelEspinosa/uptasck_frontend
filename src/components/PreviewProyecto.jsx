import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'
import useAuth from '../hooks/useAuth'



const PreviewProyecto = ({proyecto, index}) => {
  
  
  const {nombre, _id, cliente} = proyecto
  const {auth} = useAuth()
  
  
  
return (
    <div className='border-b p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5'>
      <div className='flex-1'>
      <p className='flex flex-col text-2xl font-bold'>
         <span className='text-xl text-sky-600 font-black'>{index}{' '}</span> {nombre}
          <span className=' text-gray-500 uppercase text-sm'>
               {' '}{cliente}</span>
      </p>
      </div>
      {proyecto.creador !== auth._id && <div className="bg-green-400 text-white font-bold rounded-md text-xs
                                          w-24 text-center ">
                                colaborador</div> }
      
     
    <Link to={`${_id}`} className='text-sky-600 hover:text-sky-900 font-bold uppercase
                        hover:shadow-sl hover:font-black hover:cursor-pointer transition-all '>
        Ver proyecto
    </Link>
    </div>
  )
}

export default PreviewProyecto