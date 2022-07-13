import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({children}) =>{
   const[auth, setAuth]=useState({})
   const[cargando, setCargando]=useState(true)
   /* const navigate = useNavigate() */  // ya no hace falta
   useEffect(()=>{
    const autenticarUsuario = async () =>{
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return            
        }
        const config = {
            headers:{
               "Content-Type": "application/json" ,
               Authorization: `Bearer ${token}`
            }
        }
        try {
          const {data} = await clienteAxios('/usuarios/perfil', config) 
          setAuth(data)
          /* navigate ('/proyectos') */ // asi no nos lleva a proyectos cada vez que se recargue la pagina
                                        // este codigo lo he movido a login para que compruebe si hay token
                                        // y entonces si que lo redirecciono a proyectos
        } catch (error) {
          setAuth({})
        }finally{
            setCargando(false)

        }
    }
    
    autenticarUsuario()
    
   },[])
    return(
      <AuthContext.Provider 
        value = {{
          setAuth,
          auth, 
          cargando
        }}
      >
        {children}
      </AuthContext.Provider>
    )
 
}

export {
    AuthProvider
}
export default AuthContext