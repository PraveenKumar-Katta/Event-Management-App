import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setDescription, setTitle } from '../features/eventCreationSlice';

const Step1 = ({eventData,handleChange,setStep}) => {
    const {title,description,category}=useSelector((state)=>state.eventCreation)
    const dispatch=useDispatch()
    const eventCategories = [
    "Conferences",
    "Meetups",
    "Workshops",
    "Webinars",
    "Networking",
    "Education",
    "Entertainment",
    "Music",
    "Competitions",
    "Art & Culture",
    "Sports & Fitness",
    "Expos & Trade Shows",
    "Tech",
    "Charity & Causes",
    "Travel & Outdoors",
    "Family & Kids",
    "Weddings & Parties",
    "Wellness & Mental Health",
    "Food & Drink",
    "DIY & Makers"
    ];
    function nextStep(e){
        e.preventDefault()
        setStep(2)
    }
  return (
    <div className=" mx-auto p-6 mt-10  dark:bg-gray-800 rounded-lg  shadow-md">
        <form  onSubmit={nextStep} className="space-y-4 ">
            <input
            type="text"
            value={title}
            required
            placeholder="Enter Title"
            onChange={(e) => dispatch(setTitle(e.target.value))}
            className="w-full px-4 py-2  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
            <input
            type="text"
            required
            autoComplete="off"
            placeholder="Description"
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
            <select
            value={category}
            required
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            >
            {eventCategories.map((c, i) => (
                <option key={i} value={c}>
                {c}
                </option>
            ))}
            </select>
            <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
            Next
            </button>
        </form>
        </div>
  )
}

export default Step1