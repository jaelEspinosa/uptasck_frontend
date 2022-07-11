import clienteAxios from "../config/clienteAxios"
import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta]=useState({})
  const navigate = useNavigate()
  const handleSubmit = async e =>{
    e.preventDefault()

    if (email === '' || email.length < 6){
      setAlerta({
        msg: 'Rellene el Email',
        error:true
      })
      return
    }
    const url = `/usuarios/olvide-password`
    
    try {
      
    const {data} = await clienteAxios.post(url,{email}) 
    setAlerta({
      msg:data.msg,
      error:false
    })
    setTimeout(() => { 
        navigate ('/')
    }, 3000)
    
    } catch (error) {
      setAlerta({
       msg: error.response.data.msg,
       error:true
      })
    }
    
  }
  return (
    <>
    <h1 className="text-sky-600 font-black text-5xl md:mt-12 capitalize px-5">Rellena tu email y enviamos {' '}
    <span className="text-slate-700 text-4xl md:text-5xl">Instrucciones</span></h1>
    {alerta.msg && <Alerta alerta={alerta} />}
 <form 
      className="my-10 bg-white rounded-lg shadow p-10"
      onSubmit={handleSubmit}
      >
  
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
 
     <input 
      type='submit'
      value='Enviar Email'
      className='mb-5 bg-sky-700 rounded font-bold py-3 text-white w-full text-2xl 
      hover:cursor-pointer hover:bg-sky-800 transition-colors'

     />
 </form>
 <nav className="lg:flex lg:justify-between">     
    <Link 
     to ='/'
     className="m-auto my-5 text-slate-500 uppercase text-sm"
     >¿Ya tienes cuenta? Inicia sesión</Link>    
 </nav>

</>
  )
}

export default OlvidePassword