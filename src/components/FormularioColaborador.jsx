import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormularioColaborador = () => {
    const [email, setEmail] = useState('')
    const {alerta, setAlerta, submitColaborador}=useProyectos()

    const handleSubmit = e =>{
        e.preventDefault()
        if (!email){
          setAlerta({
            msg:'El Campo Email es Obligatorio',
            error:true
          })
          setTimeout(() => {
            setAlerta({})
          }, 2000);
            return
        }
        submitColaborador(email)   
    }
    return (
        <form 
         
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            {alerta.msg && <Alerta alerta = {alerta}/>}
            <div className='mb-5'>
                <label
                    className='text-gray-700 font-bold uppercase text-sm'
                    htmlFor='email'
                >Email Colaborador:</label>
                <input
                    type='email'
                    id='email'
                    className='outline-none hover:outline-sky-600 border-2 w-full p-2 mt-2 rounded-md placeholderbg-gray-400'
                    placeholder='Email de usuario'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <input
                type='submit'
                value='Buscar Colaborador'
                className='text-sm px-5 py-3 w-full mt-10 
                  rounded-lg uppercase font-bold bg-sky-500 hover:bg-sky-700 transition-colors
                text-white text-center'
            />
        </form>
    )
}

export default FormularioColaborador