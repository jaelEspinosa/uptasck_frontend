import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormularioColaborador = () => {
    const [email, setEmail] = useState('')
    const { alerta, listaUsuarios, agregarColaborador } = useProyectos()

   

    const usuariosFiltrados = listaUsuarios.filter(usuario => usuario.email.includes(email))
    console.log(usuariosFiltrados)
    return (
        <form

            
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
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


            {email.length > 0 && <div className="border-2 px-5 py-2 rounded-md">
                
                {usuariosFiltrados.map(usuario => (
                    <div 
                        className="flex gap-2 my-2 items-center justify-between text-xs"
                        key={usuario._id}>
                        <p>{usuario.email}</p>
                        <button
                            onClick={() => agregarColaborador({
                                email: usuario.email
                            })}
                            type='button'
                            className="bg-slate-500 hover:bg-slate-600 
                             transition-colors py-1 px-2 rounded-md text-white"
                        >Agregar</button>
                    </div>
                ))}

                {!usuariosFiltrados.length && <p>No hay resultados</p>}
            </div>}
            
            <div className="w-full">

                {alerta.msg && <Alerta alerta={alerta} />}

            </div>
        </form>
    )
}

export default FormularioColaborador