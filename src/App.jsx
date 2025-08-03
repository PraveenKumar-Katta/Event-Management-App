import { useState } from 'react'

import './App.css'
import EventForm from './components/EventForm'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EventDetails from './components/EventDetails'
import EventInvite from './components/EventInvite'
import BannerLandingPage from './components/Banner'



function App() {

  return (
    <div className='bg-gray-900 min-h-screen  overflow-y-auto'>
      <ToastContainer position='top-center' autoClose={1000}/>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/" element={<BannerLandingPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/createEvent' element={<PrivateRoute><EventForm/></PrivateRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path='/event/:id' element={<PrivateRoute><EventDetails/></PrivateRoute>}  />
        <Route path="/event-invite" element={<EventInvite/>} />
      </Routes>
    </div>
  )
}

export default App
