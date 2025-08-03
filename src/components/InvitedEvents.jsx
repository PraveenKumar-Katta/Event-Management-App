import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db } from '../utils/firebase'
import { fetchEvents, updateStatusAccept, updateStatusReject } from '../features/eventsSlice'
import { toast } from 'react-toastify'

const InvitedEvents = () => {
    const {data}=useSelector((state)=>state.events)
    const user=JSON.parse(localStorage.getItem("user"))
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let [search,setSearch]=useState("")
    let [filterBy,setFilterby]=useState("")
    const [filteredData,setFilteredData]=useState([])
    const userEmail=user.email
    const today=new Date().toISOString().split("T")[0].split("-").join("")
    const invitedEvents=useMemo(()=>data.filter((e)=>{
        return e.invitees.hasOwnProperty(user.email)
    }),[data,user.email])
    
    const email=String(user.email)
    async function handleAccept(id){
        dispatch(updateStatusAccept({email,id}))
        const eventRef=await    getDoc(doc(db,`events`,id))
        const currentData=eventRef.data()
        const exisitingInvites=currentData?.invitees||{}
        const updatedInvites={
            ...exisitingInvites,
            [email]:"accepted"
        }
        await updateDoc(doc(db,`events`,id),{invitees:updatedInvites})
        toast.success("Updated Sucessfully!")
    }
    async function handleReject(id){
        dispatch(updateStatusReject({id,email}))
        const eventRef=doc(db,`events`,id)
        const docsnap=await getDoc(eventRef)
        const currentData=docsnap.data()
        const exisitingInvites=currentData?.invitees||{}
        const updatedInvites={
            ...exisitingInvites,
            [email]:"rejected"
        }
        await updateDoc(eventRef,{invitees:updatedInvites})
        toast.success("Updated Sucessfully!")
    }
    useEffect(() => {
    let result = invitedEvents;

    if (filterBy) {
      result = result.filter((e) => {
        const eventDate = e.date?.split('-').join('');
        if (filterBy === 'today') return eventDate === today;
        if (filterBy === 'upcomming') return eventDate > today;
        if (filterBy === 'past') return eventDate < today;
        return true;
      });
    }

    if (search.trim()) {
      result = result.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(result);
  }, [search, filterBy, invitedEvents]);

  return (
    <div className='text-white  flex flex-col  w-screen' >
        <div className='fixed w-full  bg-gray-900 top-32 flex z-20 flex-col h-fit justify-center items-center'>
            <h1 className='font-bold uppercase text-2xl py-4'>Invited Events</h1>
            <input className='w-[70%]  bg-white  font-semibold text-black px-6 py-2  rounded text-xl  focus:outline-none' type="text" placeholder='🔍Search Event by title...' value={search}  onChange={(e)=>setSearch(e.target.value)} />
            <select className='bg-white m-2 min-w-30 w-[20%] text-black p-2 focus:outline-none rounded text-xl font-semibold' value={filterBy} onChange={(e)=>setFilterby(e.target.value)}>
                <option value="">Filter By</option>
                <option value="All">All</option>
                <option value="upcomming">Up Comming</option>
                <option value="past">Completed</option>
                <option value="today">Today</option>
            </select>
        </div>
        <div className="flex flex-wrap pt-80 justify-center items-center gap-4  ">
        {filteredData.length==0&&<h1 className='text-2xl text-center text-white font-semibold'>No Invitations😞</h1>}
        {filteredData.map((e) => (
            <div
            key={e.id}
            className="bg-white min-w-80  rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
            >
            <h2 className="text-xl font-semibold text-gray-800">{e.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
                📅 {new Date(e.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-600">
                Invitees: <span className="font-medium">{Object.keys(e.invitees || {}).length}</span>
            </p>
            {e.invitees[user.email]=="pending"&&<p className='text-orange-600'>No Responce Received from you</p>}
            {e.invitees[user.email]=="accepted"&&<p className='text-green-600'>Accepted</p>}
            {e.invitees[user.email]=="rejected"&&<p className='text-red-600'>Rejected</p>}
            <div className='flex gap-10 justify-center items-center mt-2'>
                <button onClick={()=>handleAccept(e.id)} className=' cursor-pointer hover:bg-green-900 px-4 rounded bg-green-600 text-white font-bold' >Accept</button>
                <button onClick={()=>handleReject(e.id)} className=' cursor-pointer hover:bg-red-900 px-4 rounded bg-red-600 text-white font-bold'>Reject</button>
            </div>
            <button
                onClick={() => navigate(`/event/${e.id}`)}
                
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                View Details
            </button>
                
            </div>
        ))}
        </div>

    </div>
    
  )
}

export default InvitedEvents