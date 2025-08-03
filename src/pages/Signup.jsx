import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser } from '../features/authslice'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [message,setMessage]=useState("")
    let navigate=useNavigate()
    let dispatch=useDispatch()
    let {loading,error}=useSelector((state)=>state.auth)
    function handleSubmit(e){
        e.preventDefault()
        if(!email||!password)return
        dispatch(signUpUser({email,password})).unwrap().then(()=>{
            setMessage("Registration success!");
            setEmail("")
            setPassword("")
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        })
        .catch(()=>{
            setMessage("");
        })
    }
  return (

     <div className='min-h-screen w-full bg-gradient-to-l from-pink-500 to-purple-800 flex flex-col overflow-hidden justify-center items-center p-4'>
            <div className=' flex flex-col md:flex-row w-full max-w-5xl rounded-xl overflow-hidden shadow-lg'>
                <div className='w-full md:w-1/2 bg-gray-700 flex flex-col gap-4 justify-center items-center p-8'>
                    <h1 className='text-transparent bg-clip-text text-white text-2xl   font-bold md:text-4xl lg:text-6xl text-center'>Join the Event Revolution</h1>
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 text-center via-purple-500 to-blue-500 font-extrabold text-4xl">Bring people together with ease</h2>
                </div>
                <div className=' w-full md:w-1/2 bg-gray-900 flex flex-col p-6 sm:p-10'>
                    <h1 className='text-white font-bold text-2xl md:text-4xl'>Create Your Accout</h1>
                    <h4 className='text-xl  md:text-2xl lg:text-3xl text-gray-500 font-semibold'>Please create an account to create your first event</h4>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center mt-5 items-center' >
                        <input className='w-full border-b  focus:outline-none bg-transparent border-gray-500 focus:border-blue-500 text-gray-600 text-white px-4 py-2 text-2xl' type="email" value={email} placeholder='Email address' onChange={(e)=>setEmail(e.target.value)} />
                        <input className='w-full border-b  focus:outline-none bg-transparent border-gray-500 focus:border-blue-500 text-gray-600 text-white px-4 py-2 text-2xl' type="password" value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
                        <button className='w-full  cursor-pointer text-transparent bg-text-clip px-2 py-2 text-3xl text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded font-bold' type='submit'>{loading?"Signing Up...":"SingUp"}</button>
                        <p className='text-white text-xl'>Already Have an Account?<Link className='text-blue-900' to="/login"> LogIn</Link></p>
                        {error&&<p className='text-red-500'>{error}</p>}
                        {message&&<p className='text-red-500'>{message}</p>}
                          </form>
                </div>
            </div>
        </div>
















  )
}

export default Signup