import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { db } from "../utils/firebase";
import { useDispatch } from "react-redux";
import {
  updateStatusAccept,
  updateStatusReject,
} from "../features/eventsSlice";
import { toast } from "react-toastify";

const EventInvite = () => {
  const [event, setEvent] = useState(null);
  const [params] = useSearchParams();
  let [responce, setResponse] = useState(false);
  const id = params.get("eventId");
  const email = params.get("email");
  const dispatch = useDispatch();
  async function fetchEvent() {
    const eventref = doc(db, "events", id);
    const eventSnap = await getDoc(eventref);
    setResponse(true);
    if (eventSnap.exists()) {
      setEvent({ ...eventSnap.data(), id: eventSnap.id });
    }
  }
  useEffect(() => {
    fetchEvent();
  }, [id, email]);

  async function handleResponse(responce) {
    await updateDoc(doc(db, "events", id), {
      ...event,
      invitees: {
        ...event.invitees,
        [email]: responce,
      },
    });
    if (responce == "accepted") {
      dispatch(updateStatusAccept({ id, email }));
    } else {
      dispatch(updateStatusReject({ id, email }));
    }
    toast.success(
      `Your ${responce}ed the Invitation,Thank you for your responce`
    );
  }

  return (
    <div className="min-h-screen bg-gray-900  flex flex-col items-center justify-center text-white p-4">
      {responce && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-xl shadow-md max-w-xl mx-auto mt-10">
          <h1 className="text-2xl font-semibold">🎉 Thank You!</h1>
          <p className="mt-2">Your response has been successfully recorded.</p>
        </div>
      )}

      {!event && !responce && (
        <h1 className="text-2xl">loading...</h1>
      )}{event&&!responce&&  (
        <div className=" shadow-md w-1/2 p-20 sm:w-[450px] w-[300px] px-5 rounded bg-gray-600">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="mb-2">
            📍 {event.location?.address || "No address provided"}
          </p>
          <p className="mb-4">
            🕒 {new Date(event.createdAt).toLocaleString()}
          </p>
          <p className="mb-6">{event.description}</p>

          <div className="flex gap-4">
            <button
              onClick={() => handleResponse("accepted")}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={() => handleResponse("rejected")}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInvite;
