

const Alerta = ({alerta}) => {
  return (
    <div
    className={`${alerta.error ? 'from-red-700 to-red-400' :
     'from-sky-600 to-sky-800 '}
     bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-m my-10`}
    >{alerta.msg}</div>
  )
}

export default Alerta
