import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useLogin, useUser } from '../hooks'
import { Loading } from '../components/shared/Loading'
import { Loader } from '../components/shared/Loader'

export const LoginPage = () => {

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  //TODO - DELETE DEFUALT VALUES
  const [email, setEmail] = useState('maap00@test.com')
  const [password, setPassword] = useState('123456')

  const { session, isLoading } = useUser();

  const { mutate, isPending } = useLogin();

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  }

  if (isLoading) return <Loader />;

  if (session) return <Navigate to='/home' />;

  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
      <h1 className="text-4xl font-bold capitalize">
        Inicia sesión
      </h1>
      <p className="text-sm font-medium">
        ¡Te damos la bienvenida!
      </p>

      {isPending ?
        (
          <Loading />
        ) : (
          <>
            <form action="" className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]" onSubmit={onLogin}>
              <input type="email"
                className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
                placeholder='Correo electrónico' value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password"
                className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
                placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
              <button
                className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
                Iniciar sesión
              </button>
            </form>
            <p className="text-sm text-stone-800">
              <Link to='/register' className="underline ml-2">
                Crear cuenta
              </Link>
            </p>
          </>
        )}



    </div>
  )
}
