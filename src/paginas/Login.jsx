import { Link } from "react-router-dom"


const Login = () => {
  return (
    <>
        <h1 className="text-sky-600 font-black text-5xl capitalize px-5">Inicia sesión y administra tus {' '}
        <span className="text-slate-700 text-4xl md:text-5xl">proyectos</span></h1>
     <form className="my-10 bg-white rounded-lg shadow p-10">
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
         to ='/registrar'
         className="block text-center my-5 text-slate-500 uppercase text-sm"
         >¿No tienes cuenta? Regístrate</Link>
          <Link 
         to ='/olvide-password'
         className="block text-center my-5 text-slate-500 uppercase text-sm"
         >Olvidé el password</Link>
     </nav>
    
    </>
    
  )
}

export default Login