import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logInUser } from '../features/authslice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let navigate=useNavigate()
    let dispatch=useDispatch()
    let {loading,error,user}=useSelector((state)=>state.auth)
    function handleSubmit(e){
        e.preventDefault()
        if(!email||!password)return
        dispatch(logInUser({email,password})).unwrap().then(()=>{
            toast.success("Login Sucess")
            navigate('/dashboard')
        })
    }
  return (
    <div className='min-h-screen  bg-gradient-to-l min-w-full from-pink-500 to-purple-800 flex flex-col border justify-center items-center p-4' >
        <div className=' flex flex-col md:flex-row w-full max-w-5xl rounded-xl overflow-hidden shadow-lg'>
            <div className='w-full md:w-1/2 bg-gray-700 flex flex-col gap-4 justify-center items-center p-8'>
                <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl text-center">Welcome Back</h1>
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-extrabold text-2xl md:text-3xl lg:text-4xl text-center">Let’s Continue</h2>
                <h4 className="text-gray-300 text-lg md:text-xl lg:text-2xl text-center">Your Events Are Awaiting</h4>
            </div>
            <div className='w-full md:w-1/2 bg-gray-900 flex flex-col p-6 sm:p-10'>
                <h1 className='text-white font-bold md:text-2xl lg:text-4xl text-xl '>WelCome Back!</h1>
                <h4 className='text-xl  text-gray-500 font-semibold'>Please sign in to access your account</h4>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center items-center mt-5' >
                    <input className='w-full border-b  focus:outline-none bg-transparent border-gray-500 focus:border-blue-500 text-gray-600 text-white px-4 py-2 text-2xl' type="email" value={email} placeholder='Email address' onChange={(e)=>setEmail(e.target.value)} />
                    <input className='w-full border-b  focus:outline-none bg-transparent border-gray-500 focus:border-blue-500 text-gray-600 text-white px-4 py-2 text-2xl' type="password" value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
                    <button className='w-full  cursor-pointer text-transparent bg-text-clip px-2 py-2 text-3xl text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded font-bold' type='submit'>{loading?"Loging In...":"LogIn"}</button>
                    <p className='text-white text-xl'>Don't Have an Account?<Link className='text-blue-900' to='/signup'> Sign Up</Link></p>
                    {error&&<p className='text-red-600'>{error}</p>}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login