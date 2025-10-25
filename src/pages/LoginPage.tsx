import { useState } from 'react'
import { Link } from 'react-router-dom'

export const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
return (
<div className="h-full flex flex-col items-center mt-12 gap-5">
  <h1 className="text-4xl font-bold capitalize">
    Start Sesion
  </h1>
  <p className="text-sm font-medium">
    Welcome back!
  </p>
  <>
    <form action="" className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]">
      <input type="email"
        className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
        placeholder='Insert email' 
        value={email}
        onChange={e => setEmail(e.target.value)}/>
      <input type="password"
        className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
        placeholder='Insert password' 
        value={password}
        onChange={e => setPassword(e.target.value)}/>
      <button
        className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
        Log In
      </button>
    </form>
    <p className="text-sm text-stone-800">
      <Link to='/register' className="underline ml-2">
        Sign Up
      </Link>
    </p>
  </>
</div>
)
}