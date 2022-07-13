import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioProyecto = () => {
  const[id, setId]=useState(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')
  const {alerta, setAlerta, submitProyecto, proyecto}= useProyectos()
  const params = useParams()
  
  useEffect(()=>{
    if(params.id){
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
      setCliente(proyecto.cliente)
    }
  },[params])
  
  const handleSubmit = async e =>{
    e.preventDefault()
    
    if([nombre, descripcion, fechaEntrega, cliente].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios', 
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 2000);
      return
    }
    // pasar los datos hacia el provider
    await submitProyecto ({id, nombre, descripcion, fechaEntrega, cliente})
    
    setId(null)
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  }

  return (

    <form
      onSubmit={handleSubmit}
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md '>
      <div>
        {alerta.msg && <Alerta alerta = {alerta}/>}
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='nombre'
        >Nombre Proyecto</label>
        <input
          placeholder='Nombre del Proyecto'
          type='text'
          id='nombre'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={nombre}
          onChange={e => setNombre(e.target.value)}

        />
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='descripcion'
        >Descripción</label>
        <textarea
          placeholder='Descripción del Proyecto'
          type='text'
          id='descripcion'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}

        />
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='fecha-entrega'
        >Fecha de Entrega</label>
        <input

          type='date'
          id='fecha-entrega'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}

        />
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='cliente'
        >Cliente</label>
        <input
          placeholder='Nombre del Cliente'
          type='text'
          id='cliente'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={cliente}
          onChange={e => setCliente(e.target.value)}

        />
      </div>
      <input
        type='submit'
        className='bg-sky-600 py-3 w-full rounded-xl hover:bg-sky-700
                    cursor-pointer text-white font-bold uppercase transition-colors'
        value={id ? 'Guardar Cambios':'Crear proyecto'}
      />

    </form>
  )
}

export default FormularioProyecto