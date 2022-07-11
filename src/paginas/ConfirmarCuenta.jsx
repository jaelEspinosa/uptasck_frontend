import  axios  from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"


const ConfirmarCuenta = () => {
  const params = useParams()
  const { id } = params
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  useEffect(() => {

    const confirmarCuenta = async () => {
      try {
       

        const url = `${import.meta.env.VITE_BACKEND_URL}/usuarios/confirmar/${id}`
        const { data } = await axios(url)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [])

  return (

    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize px-5 mt-20">Confirma tu Cuenta y empieza a crear tus  {' '}
        <span className="text-slate-700 text-4xl md:text-5xl">proyectos</span></h1>

      <div className="bg-white rounded-xl my-10 py-10 px-5">
        {alerta.msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada &&
          <Link
            to='/'
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >Inicia sesión
          </Link>
        }
      </div>
    </>

  )
}

export default ConfirmarCuenta