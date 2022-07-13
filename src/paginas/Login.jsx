import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import Spinner from "../components/Spinner"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  
  useEffect(()=>{
   const token = localStorage.getItem('token')
   if (token){
    navigate('/proyectos')
   }

  },[])
  const handleSubmit = async e => {
    e.preventDefault()
    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    try {
      const { data } = await clienteAxios.post('usuarios/login', { email, password })
      localStorage.setItem('token', data.token)
      setAuth(data)
      setAlerta({
        msg: `Iniciando sesión como: - ${data.nombre}`,
        error: false
      })

      setTimeout(() => {
        navigate('/proyectos')
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 800);
    }
  }


  return (
    <>

      <h1 className="text-sky-600 font-black text-5xl capitalize px-5">Inicia sesión y administra tus {' '}
        <span className="text-slate-700 text-4xl md:text-5xl">proyectos</span></h1>

      {alerta.msg && <Alerta alerta={alerta} />}
      {alerta.msg && !alerta.error && <div>
        <Spinner />
      </div>}
      {!alerta.msg && !alerta.error && (
        <>
          <form
            onSubmit={handleSubmit}
            className="my-10 bg-white rounded-lg shadow p-10">
            <div className="my-5" >
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="email"
              >Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email de Registro"
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
                placeholder="password"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:border-sky-700 focus:outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input
              type='submit'
              value='iniciar sesión'
              className='mb-5 bg-sky-700 rounded font-bold py-3 text-white w-full text-2xl 
          hover:cursor-pointer hover:bg-sky-800 transition-colors'

            />
          </form>
          <nav className="lg:flex lg:justify-between">

            <Link
              to='/registrar'
              className="block text-center my-5 text-slate-500 uppercase text-sm"
            >¿No tienes cuenta? Regístrate</Link>
            <Link
              to='/olvide-password'
              className="block text-center my-5 text-slate-500 uppercase text-sm"
            >Olvidé el password</Link>
          </nav>
        </>
      )

      }


    </>

  )
}

export default Login