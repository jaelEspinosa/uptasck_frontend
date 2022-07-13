import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'


const ModalFormularioTarea = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [prioridad, setPrioridad] = useState('')
    const {alerta, setAlerta}=useProyectos()
    
    const handleSubmit= e =>{
        e.preventDefault()
        if([prioridad, descripcion, nombre].includes('')){
            setAlerta({
                msg:'Todos los campos son Obligatorios',
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000);
            return       }
    }

    const { modalFormularioTarea, hadleModalTarea } = useProyectos()
    return (
        <Transition.Root show={modalFormularioTarea} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={hadleModalTarea}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={hadleModalTarea}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-2xl leading-6 font-bold text-gray-900">
                                        Crear Tarea
                                    </Dialog.Title> 
                                    {alerta.msg && <Alerta alerta = {alerta}/>}
                                    <form className='my-10' onSubmit={handleSubmit}>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold uppercase text-sm'
                                                htmlFor='nombre'
                                            >Nombre de la tarea:</label>
                                            <input
                                                type='text'
                                                id='nombre'
                                                className='border-2 w-full p-2 mt-2 rounded-md placeholderbg-gray-400'
                                                placeholder='Nombre de la tarea'
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            />

                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold uppercase text-sm'
                                                htmlFor='descripcion'
                                            >Descripción:</label>
                                            <textarea

                                                id='descripcion'
                                                className='border-2 w-full p-2 mt-2 rounded-md placeholderbg-gray-400'
                                                placeholder='Descripción'
                                                value={descripcion}
                                                onChange={e => setDescripcion(e.target.value)}
                                            />

                                        </div>
                                        <label className='text-gray-700 uppercase text-sm font-bold'>Prioridad:</label>
                                        <div className='flex justify-evenly '>
                                            <label className='flex gap-2 justify-center' htmlFor='Alta'>Alta
                                            <input 
                                                 onChange={e=>setPrioridad(e.target.value)}
                                                 type='radio' value='Alta' name='Prioridad' /></label>
                                            <label className='flex gap-2 justify-center' htmlFor='Media'>Media
                                            <input
                                                 onChange={e=>setPrioridad(e.target.value)}                                                
                                                 type='radio' value='Media' name='Prioridad' /></label>
                                            <label className='flex gap-2 justify-center' htmlFor='Baja'>Baja
                                            <input 
                                                 onChange={e=>setPrioridad(e.target.value)}                                                  
                                                 type='radio' value='Baja' name='Prioridad' /></label>
                                        </div>
                                        <input
                                            type='submit'
                                            value='Guardar Tarea'
                                            className='text-sm px-5 py-3 w-full mt-5 
                                                 rounded-lg uppercase font-bold bg-sky-500 hover:bg-sky-700 transition-colors
                                               text-white text-center'
                                        />


                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea