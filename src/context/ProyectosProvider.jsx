import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import io from 'socket.io-client'

let socket;

const ProyectosContext = createContext()


const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([])
  const [alerta, setAlerta] = useState({})
  const [proyecto, setProyecto] = useState({})
  const [colaborador, setColaborador] = useState({})
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)
  const { auth } = useAuth()
  const [modalEliminarProyecto, setModalEliminarPoryecto] = useState(false)
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
  const [buscador, setbuscador] = useState(false)
  const [tarea, setTarea] = useState({})
  
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

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])



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
      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

      // sincronizar el state

      const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
      setProyectos(proyectosActualizados)

      /* setProyectos(proyectosActualizados) */

      // mostrar alerta
      setAlerta({
        msg: 'Guardado correctamente',
        error: false
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
      setAlerta({})

    } catch (error) {
      navigate('/proyectos')
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta({})

      }, 2000);

    }
    setCargando(false)
  }

  const eliminarProyecto = async id => {


    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const url = `/proyectos/${id}`

      const { data } = await clienteAxios.delete(url, config)

      // mostrar alerta
      setAlerta({
        msg: 'Proyecto Eliminado con Éxito',
        error: false
      })

      // sincronizar state

      const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)

      setProyectos(proyectosActualizados)

      // redireccionar
      handleModalEliminarProyecto()
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 2000);


    } catch (error) {
      console.log(error)
    }

  }
  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea)
    setTarea({})
  }

  const submitTarea = async tarea => {

    if (tarea?.id) {
      await editarTarea(tarea)
    } else {
      await crearTarea(tarea)
    }
  }
  const crearTarea = async tarea => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/tareas', tarea, config)


      setAlerta({
        msg: 'Tarea Agregada con Éxito',
        error: false
      })
      handleModalTarea()

      setTimeout(() => {
        setAlerta({})
      }, 2000);

      // SOCKET IO

      socket.emit('nueva tarea', data)

    } catch (error) {
      console.log(error)
    }
  }

  const editarTarea = async tarea => {
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

      // SOCKET IO

      socket.emit ('actualizar tarea', data)

      setAlerta({})
      setModalFormularioTarea(false)

    } catch (error) {
      console.log(error)
    }
  }

  const handleEditarModalTarea = tarea => {
    setTarea(tarea)
    setModalFormularioTarea(true)
  }

  const handleModalEliminarTarea = tarea => {
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  }

  const handleModalEliminarProyecto = proyecto => {
    setModalEliminarPoryecto(!modalEliminarProyecto)

  }

  const eliminarTarea = async tarea => {
    handleModalEliminarTarea()
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
      setAlerta({
        msg: data.msg,
        error: false
      })




      // SOCKET IO
      socket.emit('eliminar tarea', tarea)

      setTarea({})
      setTimeout(() => {
        setAlerta({})
      }, 2000);



    } catch (error) {
      console.log(error)
    }
  }

  const submitColaborador = async email => {
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
      const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config)
      setColaborador(data)
      setAlerta({})

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta({})

      }, 2000);

    } finally {
      setCargando(false)
    }
  }

  const agregarColaborador = async email => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)

      setAlerta({
        msg: data.msg,
        error: false
      })
      setColaborador({})
      setTimeout(() => {
        navigate(`/proyectos/${proyecto._id}`)
        setAlerta({})
      }, 2000);


    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const handleModalEliminarColaborador = colaborador => {
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)

  }
  const eliminarColaborador = async colaborador => {

    setColaborador(colaborador)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)

      const proyectoActualizado = { ...proyecto }

      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)

      setProyecto(proyectoActualizado)

      setAlerta({
        msg: data.msg,
        error: false
      })
      setTimeout(() => {
        setAlerta({})

      }, 2000);
      setColaborador({})
      handleModalEliminarColaborador()

    } catch (error) {
      console.log(error)
    }

  }

  const completarTarea = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
      

     // SOCKET IO

     socket.emit('cambiar estado', data)

      setTarea({});
      setAlerta({});

    } catch (error) {
      console.log(error.response)
    }
  }

  const handleBuscador = () => {
    setbuscador(!buscador)
  }

  // SOCKET IO

  const SubmitTareasProyecto = tarea => {
    // agrega la tarea creada al state para que se muestre sin necesidad de recargar la pagina y hacer
    // otra peticion a la api

    const tareasActualizadas = [...proyecto.tareas, tarea] // actualizo el array de tareas       
    const proyectoActualizado = { ...proyecto } // tomo una copia del proyecto original
    proyectoActualizado.tareas = tareasActualizadas // sustituyo el array original por el de tareasActualizadas
    // ahora ya puedo setear el state de proyecto con proyecto actualizado con el nuevo 
    // arrray de tareas

    setProyecto(proyectoActualizado)

  }

  const eliminarTareaProyecto = tarea => {
    // Actualizar el state para actualizar el DOM
    const proyectoActualizado = { ...proyecto }
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)

    setProyecto(proyectoActualizado)
  }

  const actualizarTareaProyecto = tarea =>{
           // actualizando state
      const proyectoActualizado = { ...proyecto } // tomo una copia del proyecto del state
      const tareasActualizadas = proyecto.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
      // Actualizo el array de tareas de la copia con la tarea editada
      proyectoActualizado.tareas = tareasActualizadas
      setProyecto(proyectoActualizado) // seteo el state con las tareas actualizadas
  }

  const cambiarEstadoTarea = tarea =>{
    const proyectoActualizado = { ...proyecto }
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
    setProyecto(proyectoActualizado)
  }
  const cerrarSesionProyectos = () =>{
    setProyectos([])
    setProyecto({})
    setAlerta({})
    setColaborador({})

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
        tarea,
        handleModalEliminarTarea,
        modalEliminarTarea,
        eliminarTarea,
        modalEliminarProyecto,
        handleModalEliminarProyecto,
        submitColaborador,
        colaborador,
        agregarColaborador,
        modalEliminarColaborador,
        handleModalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        buscador,
        handleBuscador,
        SubmitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
        cerrarSesionProyectos,
        
        
      }}
    >{children}
    </ProyectosContext.Provider>
  )
}

export {
  ProyectosProvider
}
export default ProyectosContext