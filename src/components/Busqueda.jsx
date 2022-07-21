import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import '../styles/input.css'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Busqueda = () => {
    const [busqueda, setBusqueda] = useState('')
    const { buscador, handleBuscador, proyectos } = useProyectos()
    
    const proyectosFiltrados = busqueda === '' ? [] : proyectos.filter(proyecto =>
        proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()))

    return (
        <Transition.Root show={buscador} as={Fragment} afterLeave={() => setBusqueda('')}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20" onClose={handleBuscador}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Combobox
                        onChange={proyecto => (window.location = `/proyectos/${proyecto._id}`)}
                        as="div"
                        className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                    >
                        <div className="relative input-wrapper">
                            <Combobox.Input
                                onChange={e => setBusqueda(e.target.value)}
                                className=" input rounded-xl h-12 w-full border-none bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm outline-4 outline-sky-600  "
                                placeholder="proyecto"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>

                        {proyectosFiltrados.length > 0 && (
                            <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 
                                                                text-sm text-gray-800">
                            {proyectosFiltrados.map(proyecto => (
                                <Combobox.Option
                                    key={proyecto._id}
                                    value={proyecto}
                                    className={({active})=> classNames('cursor-default select-none px-4 py-2', active && 
                                                                       'bg-sky-600 text-whit')}
                                >
                                    {proyecto.nombre}
                                </Combobox.Option>
                            ))}
                            
                            </Combobox.Options>
                        )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}

export default Busqueda