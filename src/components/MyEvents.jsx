import { deleteDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db } from '../utils/firebase'
import { deleteevent } from '../features/eventsSlice'
import { toast } from 'react-toastify'
import {Trash2} from 'lucide-react'

const MyEvents = () => {
    const {data,loading}=useSelector((state)=>state.events)
    const user=JSON.parse(localStorage.getItem("user"))
    let [search,setSearch]=useState("")
    let [filterBy,setFilterby]=useState("")
    let myEvents=data.filter((e)=>e.createdBy.userId==user.userId)
    console.log(myEvents)
    const today=new Date().toISOString().split("T")[0].split("-").join("")
    const [filterData,setFilterData]=useState([])
    useEffect(()=>{
        const filterByDate =myEvents.filter(e => {
            const eventDate=e.date.split("-").join("")
        if(filterBy=="today"){
            return eventDate==today
        }else if(filterBy=="upcomming"){
            return eventDate>today
        }else if(filterBy=="past"){
            return eventDate<today
        }
        return true
    })
    setFilterData(filterByDate)
    },[filterBy])
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    async function deleteEvent(id){
        await deleteDoc(doc(db,"events",id))
       dispatch(deleteevent(id))
       toast.success("Event Deleted")
    }
    useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = myEvents.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(filtered);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, data]);
  return (
    <div className='text-white flex flex-col max:w-  w-screen '>
        <div className='fixed w-full  bg-gray-900 top-32 flex z-20 flex-col h-fit justify-center items-center'>
            <h1 className='font-bold uppercase  text-2xl py-4'>my Events</h1>
            <input className='w-[70%]  bg-white  font-semibold  text-black px-4 py-2  rounded text-xl  focus:outline-none' type="text" placeholder='🔍Search Event by title...' value={search}  onChange={(e)=>setSearch(e.target.value)} />
            <select className='bg-white m-2 min-w-30 w-[20%] text-black p-2 focus:outline-none rounded text-xl font-semibold' value={filterBy} onChange={(e)=>setFilterby(e.target.value)}>
                <option value="">Filter By</option>
                <option value="All">All</option>
                <option value="upcomming">Up Comming</option>
                <option value="past">Completed</option>
                <option value="today">Today</option>
            </select>
        </div>
         <div className="flex flex-wrap pt-80 justify-center items-center gap-4  static  ">
            {loading&&<p className='text-2xl'>Loading...</p>}
            {filterData.length==0&&!loading&&<h1 className='text-2xl mt-5 text-center font-semibold'>No Events Found,Create one!</h1>}
            {filterData.length>0&&filterData.map((e) => (
                <div
                key={e.id}
                className="bg-white min-w-80  rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                <h2 className="text-xl font-semibold text-gray-800">{e.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                    📅 {new Date(e.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-600">
                    Invitees: <span className="font-medium">{Object.keys(e.invitees || {}).length}</span>
                </p>
                <button
                    onClick={() => navigate(`/event/${e.id}`)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    View Details
                </button>
                
                <button onClick={()=>deleteEvent(e.id)} className='cursor-pointer bg-black rounded m-1 active:bg-red  p-2 hover:bg-gray'>
                    <Trash2/>
                </button>
                </div>
            ))}
        </div>
    </div>
   

  )
}

export default MyEvents