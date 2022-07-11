import axios from 'axios'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"



const Registrar = () => {

  const [nombre , setNombre] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [repetirPassword , setRepetirPassword] = useState('')
  const [alerta, setAlerta]= useState({})
  const navigate = useNavigate()
  const handleSubmit = async e=>{
    e.preventDefault()
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error : true
      })
      return
     }
     if(password!==repetirPassword){
      setAlerta ({
        msg: 'Los passwords no coinciden',
        error : true
      })
      return
     }
     if(password.length<6){
      setAlerta ({
        msg: 'Password minimo 6 caracteres',
        error : true
      })
      return
     }
     setAlerta({})

     // crear el usuario en la api
     try {
      

        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios`, {nombre, email, password})
         console.log(data)
        setAlerta({
        msg: data.msg,
        error:false
        }) 
        
     setTimeout(() => { 
        setNombre('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');
        setAlerta({
          msg:'',
          error:false
        }) 
      navigate('/')
      }, 3000)
      
     } catch (error) {    
      console.log(error)    
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
     }     
    }  
  return (
    <>
    <h1 className="text-sky-600 font-black text-5xl capitalize px-5">Crea tu Cuenta y Administra tus {' '}
        <span className="text-slate-700 text-4xl md:text-5xl">proyectos</span></h1>
   {alerta.msg && <Alerta alerta={alerta}/>}
 <form 
       className="my-10 bg-white rounded-lg shadow p-10"
       onSubmit={handleSubmit}
       >
       
  <div className="my-5" >
    <label 
        className="uppercase text-gray-600 block text-xl font-bold"
        htmlFor="nombre"
        >Nombre</label>
    <input 
      id="nombre"
      type="text"
      placeholder = "Nombre"
      className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:border-sky-700 focus:outline-none"
      value={nombre}
      onChange={e => setNombre(e.target.value)}
    />
  </div>
  <div className="my-5" >
    <label 
        className="uppercase text-gray-600 block text-xl font-bold"
        htmlFor="email"
        >Email</label>
    <input 
      id="email"
      type="email"
      placeholder = "Email de Registro"
      className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:border-sky-700 focus:outline-none"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
  </div>
  <div className="my-5" >
    <label 
        className="uppercase text-gray-600 block text-xl font-bold"
        htmlFor="password"
        >password</label>
    <input 
      id="password"
      type="password"
      placeholder = "password"
      className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:border-sky-700 focus:outline-none"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
  </div>
  <div className="my-5" >
    <label 
        className="uppercase text-gray-600 block text-xl font-bold"
        htmlFor="password2"
        >Repite password</label>
    <input 
      id="password2"
      type="password"
      placeholder = "password"
      className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:border-sky-700 focus:outline-none"
      value={repetirPassword}
      onChange={e => setRepetirPassword(e.target.value)}
    />
  </div>
     <input 
      type='submit'
      value='Crear Cuenta'
      className='mb-5 bg-sky-700 rounded font-bold py-3 text-white w-full text-2xl 
      hover:cursor-pointer hover:bg-sky-800 transition-colors'

     />
 </form>
 <nav className="lg:flex lg:justify-between">

     <Link 
     to ='/'
     className="block text-center my-5 text-slate-500 uppercase text-sm"
     >¿Ya tienes cuenta? Inicia sesión</Link>
      <Link 
     to ='/olvide-password'
     className="block text-center my-5 text-slate-500 uppercase text-sm"
     >Olvidé el password</Link>
 </nav>

</>
  )
}

export default Registrar