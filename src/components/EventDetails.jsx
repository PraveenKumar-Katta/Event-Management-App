import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEvents, updateStatusAccept } from '../features/eventsSlice';
import { Send, SendHorizonalIcon } from 'lucide-react';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [activeTab, setActiveTab] = useState('event');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inviteMail, setInviteMail] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "events", id), (docSnap) => {
      if (docSnap.exists()) setEvent(docSnap.data());
    });
    return () => unsub();
  }, [id]);

  useEffect(() => {
    async function fetchUsers() {
      const usersSnap = await getDocs(collection(db, 'users'));
      const userEmails = usersSnap.docs.map(doc => doc.data().email);
      setRegisteredUsers(userEmails);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "chats", id, "messages"), (snapshot) => {
      const messages = snapshot.docs.map(doc => doc.data())
        .sort((a, b) => Number(a.sortRef) - Number(b.sortRef));
      setChats(messages);
    });
    return () => unsub();
  }, [id]);

  const isRegistered = (email) => registeredUsers.includes(email);

  const sendEmail = (email) => {
    setLoading(true);
    setInviteMail(email);
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/event-invite?eventId=${id}&email=${encodeURIComponent(email)}`;

    emailjs.send(
      "service_72x4nix",
      "template_ob4x903",
      {
        to_email: email,
        from_name: "Event Manager",
        event_link: link
      },
      "MqV-122uyDzTOcfNE"
    )
    .then(() => {
      setLoading(false);
      toast.success("Invitation sent");
    })
    .catch(err => toast.error(err.message));
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    const local = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: true,
    });
    const date = local.split(",")[0].split("/").join("");
    const time = Date.now();
    const currentMessage = {
      text: message,
      owner: user.email,
      at: local,
      sortRef: date + time
    };
    await addDoc(collection(db, "chats", id, "messages"), currentMessage);
    setMessage('');
  };

  const timeline = [
    { time: "10:00 AM", title: "Welcome Speech", description: "Opening remarks by the host" },
    { time: "10:30 AM", title: "Keynote", description: "Talk by chief guest" },
    { time: "11:30 AM", title: "Break", description: "Refreshments served" },
    { time: "12:00 PM", title: "Panel Discussion", description: "Experts discuss the topic" },
    { time: "01:00 PM", title: "Closing Note", description: "Closing the Event " }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      {/* Navigation */}
      <nav className="flex justify-center gap-4 mb-4">
        <h1
          className={`cursor-pointer px-4 py-2 rounded ${activeTab === "event" ? "bg-white text-black" : "bg-gray-700"}`}
          onClick={() => setActiveTab("event")}
        >
          Event Details
        </h1>
        <h1
          className={`cursor-pointer px-4 py-2 rounded ${activeTab === "chat" ? "bg-white text-black" : "bg-gray-700"}`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </h1>
      </nav>

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-gray-700 text-white px-4 py-2 rounded mb-6"
      >
        Back
      </button>

      <div className="flex flex-col  lg:flex-row lg:justify-center gap-6 items-start">
        {activeTab === "event" && event && (
          <div className="w-full lg:w-1/2 bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p className="text-sm text-gray-300 mb-2">
              📍 {event.location?.address || 'Location not mentioned'}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              🕒 {new Date(event.createdAt).toLocaleString()}
            </p>
            <p className="mb-4">{event.description}</p>
            <p className="mb-2 font-semibold">Created by: {event.createdBy?.email}</p>

            <h3 className="mt-6 mb-2 text-xl">🎟️ Invitees</h3>
            <ul>
              {Object.entries(event.invitees).map(([email, status], i) => (
                <li key={i} className="flex justify-between items-center mb-2 bg-gray-700 px-4 py-2 rounded">
                  <span className="truncate">{email}</span>
                  <span className={`text-xs capitalize px-2 py-1 rounded ${
                    status === 'accepted' ? 'bg-green-200 text-green-800' :
                    status === 'rejected' ? 'bg-red-200 text-red-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {status}
                  </span>
                  {status === 'pending' && event.createdBy?.email === user.email && !isRegistered(email) && (
                    <button
                      onClick={() => sendEmail(email)}
                      className="ml-2 bg-black text-white px-2 py-1 rounded-full"
                    >
                      <Send size={16} />
                    </button>
                  )}
                  {loading && inviteMail === email && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-xl text-center bg-black py-2 rounded-lg mb-4">Event Timeline</h3>
            <p className="mb-2">🗓️ On: {event.date}</p>
            <div className="border-l-2 border-gray-500 pl-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="mb-4 relative">
                  <div className="absolute  w-4 h-4  bg-green-400 rounded-full top-1.5"></div>
                  <h4 className="font-semibold mx-5">{item.time} - {item.title}</h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="w-full lg:w-1/2 h-[80vh] bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Chit Chat</h2>
            <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
              {chats.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.owner === user.email ? 'items-end' : 'items-start'} mb-2`}>
                  <div className="bg-blue-300 text-black p-2 rounded-xl max-w-xs w-fit">
                    <div className="text-xs">{m.owner}</div>
                    <p className="font-semibold">{m.text}</p>
                    <small className="text-xs">{m.at}</small>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <textarea
                className="flex-1 border bg-white text-black focus:outline-none resize-none rounded-lg px-4 py-2 text-black"
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message"
              />
              <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-full">
                <SendHorizonalIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
