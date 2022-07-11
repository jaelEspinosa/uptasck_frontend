import  axios  from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')
  const [tokenOk, setTokenOk]=useState(false)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const comprobarToken = async () => {
      

      const url = `${import.meta.env.VITE_BACKEND_URL}/usuarios/olvide-password/${params.token}`
      
      try {
        const { data } = await axios(url)
        setTokenOk(true)
       
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    };


    comprobarToken()
  }, [])

  const handleSubmit = async e =>{
    e.preventDefault()
    if(password.length < 6){
      setAlerta({
        msg: 'El Password debe tener mínimo 6 caracteres',
        error: true
      })
      return
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/usuarios/olvide-password/${params.token}`
      const {data} = await axios.post(url, {password})
      
      setAlerta({
        msg: data.msg,
        error: false
      })
      setTimeout(() => {
        navigate('/')
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })

    }
  }
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">Reestablece tu password y No Pierdas Acceso a tus {' '}
        <span className="text-slate-700 text-4xl md:text-5xl">proyectos</span></h1>
     {tokenOk && 
        <form 
         className="my-10 bg-white rounded-lg shadow p-10"
         onSubmit={handleSubmit}
         >


        <div className="my-5" >
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >password</label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu nuevo password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:border-sky-700 focus:outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}

          />
        </div>

       <input
          type='submit'
          value='Guardar Nuevo Password'
          className='mb-5 bg-sky-700 rounded font-bold py-3 text-white w-full text-2xl 
      hover:cursor-pointer hover:bg-sky-800 transition-colors'
        /> 
      </form>}
      { alerta.msg  && <Alerta alerta={alerta} />}
    </>
  )
}

export default NuevoPassword