import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../features/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authslice';
import MyEvents from '../components/MyEvents';
import InvitedEvents from '../components/InvitedEvents';
import EventForm from '../components/EventForm';
import {   Menu, Tally3, X } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pending,setPending]=useState(0)
  const [activeTab, setActiveTab] = useState('myevents');
  const  user  = JSON.parse(localStorage.getItem("user")) 
  const events = useSelector((state) => state.events.data)
  const [sidebar,setSidebar]=useState("hide")

  
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  useEffect(()=>{
      const pendingRes=events.reduce((a,e)=>{
          if(e.invitees[user.email]=="pending"){
              return a+1;
          }
          return a
      },0)
      setPending(pendingRes)
    },[events,user.email])

    function changeTab(res){
      setActiveTab(res)
      setSidebar("hide")
    }
  return (
    <div className="min-h-screen  min-w-screen ">
      {/* Header with User Details */}
      <header className="bg-white fixed w-full top-0  shadow-sm">
        <div className=" mx-auto px-4  sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 onClick={()=>navigate('/dashboard')} className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-extrabold text-5xl py-2 lg:text-4xl  md:text-3xl  tracking-tight">
            Eventify
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className={`uppercase font-medium text-xl font-bold text-gray-900`}>{user?.name || 'User'}</p>
              <p className="text-md font-bold text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-300"
                src={user?.avatar || 'https://tse4.mm.bing.net/th?id=OIP.y_-RrO81dmnPR5dKO0GYWAHaHa&pid=Api&P=0&h=180'}
                alt="User avatar"
              />
              <span
                className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full ring-1 ring-white"
                aria-label="User online"
              ></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=" top-22 w-full min-h-screen">
        {/* Navigation */}
        {sidebar=="hide"?<div onClick={()=>setSidebar("show")} className={`md:hidden fixed  w-full bg-gray-900 py-3  top-20 text-white `}><Menu/></div>:
        <div onClick={()=>setSidebar("hide")} className={`fixed top-20 md:hidden w-full bg-gray-900 py-4 text-white `}><X/></div>}
        <nav className="min-w-screen fixed top-32 bg-white px-2 sm:top-30 md:top-22 lg:border-y-2 lg:top-22 z-30  shadow-sm ">
          <ul className={`${sidebar=="show"?"flex":"hidden"} md:flex flex-col md:flex-row justify-start  gap-2 p-2 text-sm sm:text-base font-medium`}>
            <li>
              <button
                onClick={()=>changeTab('myevents')}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'myevents'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-current={activeTab === 'myevents' ? 'page' : undefined}
              >
                My Events
              </button>
            </li>
            <li className='relative ' >
              {pending>0&&<button className='font-bold  rounded-full px-2 bg-red-600 text-white'>{pending}</button>}
              <button
                onClick={() => changeTab('invitedEvents')}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'invitedEvents'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-current={activeTab === 'invitedEvents' ? 'page' : undefined}
              >
                Event Invitations
              </button>
            </li>
            <li>
              <button
                onClick={() => changeTab('createEvent')}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'createEvent'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-current={activeTab === 'createEvent' ? 'page' : undefined}
              >
                Create Event
              </button>
            </li>
            <li className="ml-auto">
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate('/login');
                }}
                className="px-4 py-2 text-red-600 hover:bg-red-400 hover:text-white rounded-md transition-colors duration-200"
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>

        {/* Tab Content */}
        <div className="transition-opacity duration-300  flex flex-col items-center justify-center">
          {activeTab === 'myevents' && <MyEvents />}
          {activeTab === 'invitedEvents' && <InvitedEvents />}
          {activeTab === 'createEvent' && <EventForm />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;