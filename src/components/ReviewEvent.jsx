import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { resetEventCreation } from '../features/eventCreationSlice';
import { addEvent } from '../features/eventsSlice';

const ReviewEvent = ({ setStep }) => {
  const eventData = useSelector((state) => state.eventCreation);
  const { title, description, date, time, location, invitees, bannerUrl } = eventData;
  const  user  = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date().toISOString();

  const formattedEvent = {
    ...eventData,
    invitees: eventData.invitees.reduce((acc, email) => {
      acc[email] = 'pending';
      return acc;
    }, {}),
    createdAt: today,
    createdBy: user,
  };
  async function handleEventCreation() {
    try {
      const docRef=await addDoc(collection(db, 'events'), formattedEvent);
      const eventWithId={
        id:docRef.id,
        ...formattedEvent
      }
      toast.success('🎉 Event Created Successfully!');
      dispatch(addEvent(eventWithId))
      dispatch(resetEventCreation());
      setStep(1)

    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className=" flex flex-col border mb-20  max-w-5xl  mx-auto overflow-auto   bg-white rounded-2xl shadow-xl space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleEventCreation}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          🚀 Create Event
        </button>
      </div>
      <div className="px-15 flex flex-col h-120">
        <h1 className="text-3xl bg-white font-bold text-blue-700 text-center mb-4">🎯 Event Preview</h1>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">📝 Title</h2>
          <p className="text-gray-600">{title}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">📖 Description</h2>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">📅 Date</h2>
            <p className="text-gray-600">{date}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">⏰ Time</h2>
            <p className="text-gray-600">{time}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">📍 Location</h2>
          <p className="text-gray-600">
            {location?.address || `${location?.lat}, ${location?.lng}`}
          </p>
          {location?.lat && location?.lng && (
            <iframe
              title="map"
              width="100%"
              height="200"
              className="rounded-lg mt-2 border"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&hl=es;z=14&output=embed`}
            ></iframe>
          )}
        </div>

        {bannerUrl && (
          <div>
            {console.log(bannerUrl)}
            <h2 className="text-xl font-semibold text-gray-800">🖼️ Banner</h2>
            <img
              src={bannerUrl}
              alt="Event Banner"
              className="rounded-lg border max-h-64 w-full object-cover"
            />
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-gray-800">👥 Invitees</h2>
          <ul className="list-disc list-inside text-gray-600">
            {invitees.map((email, i) => (
              <li key={i}>{email}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewEvent;
