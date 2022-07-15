import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreviewProyecto from "../components/PreviewProyecto";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";


const ProyectosContext = createContext()


const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([])
  const [alerta, setAlerta] = useState({})
  const [proyecto, setProyecto] = useState({})

  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)
  const { auth } = useAuth()
  
  const [modalFormularioTarea, setModalFormularioTarea]=useState(false)
  const [tarea, setTarea]= useState({})
  useEffect(() => {
    const obtenerProyectos = async () => {
      setCargando(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios('/proyectos', config)
        setProyectos(data)
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }
    obtenerProyectos()
  }, [auth])


  const submitProyecto = async proyecto => {
    if (proyecto.id) {
     await editarProyecto(proyecto)
    } else {
     await nuevoProyecto(proyecto)
    }
    

  }

  const editarProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto, config)

      // sincronizar el state
      
      const proyectosActualizados = proyectos.map (proyectoState => proyectoState._id === data._id ? data : proyectoState)
      setProyectos(proyectosActualizados)
      
      /* setProyectos(proyectosActualizados) */

      // mostrar alerta
      setAlerta({
        msg:'Guardado correctamente',
        error:false
      })

      //redireccionar
      setTimeout(() => {
        setAlerta({})
        setProyecto(data)
        navigate('/proyectos')
      }, 2000);

    } catch (error) {
      console.log(error)
    }
  }

  
  const nuevoProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/proyectos', proyecto, config)
      setProyectos([...proyectos, data])
      setAlerta({
        msg: 'Proyecto creado correctamente',
        error: false
      })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000);
    } catch (error) {
      console.log(error)
    }
  }


  const obtenerProyecto = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const url = `/proyectos/${id}`
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios(url, config)
      setProyecto(data)
       
    } catch (error) {
      console.log(error)
    }
    setCargando(false)
  }

  const eliminarProyecto = async id =>{
   
    
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
        }
      }
      const url =`/proyectos/${id}`
           
      const {data} = await clienteAxios.delete(url, config)
      
      // mostrar alerta
      setAlerta({
        msg:'Proyecto Eliminado con Éxito',
        error:false
      })

      // sincronizar state

      const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
     
      setProyectos(proyectosActualizados)

      // redireccionar

      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 2000);
      

    } catch (error) {
      console.log(error)
    }

  }
  const handleModalTarea = ()=>{
    setModalFormularioTarea(!modalFormularioTarea)
    setTarea({})
  }

  const submitTarea = async tarea =>{

    if(tarea?.id){
     await editarTarea(tarea)
    }else{
     await crearTarea(tarea)
    }

    const crearTarea = async tarea =>{
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
          }
        }      
        const {data} = await clienteAxios.post('/tareas', tarea, config)
        
      // agrega la tarea creada al state para que se muestre sin necesidad de recargar la pagina y hacer
      // otra peticion a la api
  
         const tareasActualizadas = [...proyecto.tareas, data] // actualizo el array de tareas       
         const proyectoActualizado = {...proyecto} // tomo una copia del proyecto original
         proyectoActualizado.tareas = tareasActualizadas // sustituyo el array original por el de tareasActualizadas
      // ahora ya puedo setear el state de proyecto con proyecto actualizado con el nuevo 
      // arrray de tareas
      
         setProyecto(proyectoActualizado) 
     
         
  
        setAlerta({
         msg: 'Tarea Agregada con Éxito',
         error: false
        })  
        setTimeout(() => {
           setAlerta({})
           handleModalTarea()
        }, 2000);  
        
      } catch (error) {
        console.log(error)
      }
    }
    }
  const editarTarea = async tarea =>{
    try {
      const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
       
        
        
          setAlerta({})
          setModalFormularioTarea(false)
       
        
        const tareasActualizadas = proyecto.tareas.map(tarea => tarea._id === data._id ? data : tarea)
       
        const proyectoActualizado={...proyecto}
        
        proyectoActualizado.tareas= tareasActualizadas

        setProyecto(proyectoActualizado)

    } catch (error) {
      console.log(error)
    }
  }  

  const handleEditarModalTarea = tarea =>{
    setTarea(tarea)
    setModalFormularioTarea(true)
  }
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        alerta,
        cargando,
        setProyectos,
        setAlerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleEditarModalTarea,
        tarea
      }}
    >{children}
    </ProyectosContext.Provider>
  )
}

export {
  ProyectosProvider
}
export default ProyectosContext