import React, { useEffect, useState } from 'react';
import { addInvitee, removeInvitee } from '../features/eventCreationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Invites = ({ setStep }) => {
  const [email, setEmail] = useState('');
  const { invitees } = useSelector((state) => state.eventCreation);
  const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch();
  function handleAdd() {
    if (!email.trim()) return;
    dispatch(addInvitee(email));
    setEmail('');
  }

   async function fetchUsers(){
       let usersSnap= await getDocs(collection(db,"users"))
        usersSnap.forEach((doc)=>{
            if((doc.data().email!==user.email)){
                dispatch(addInvitee(doc.data().email))
            }

        })
    }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">🎯 Invite Participants</h2>
      <p className="text-gray-500 mb-6">Send invitations directly to participant emails</p>

      {/* Invitees List */}
      <div className="mb-4">
        {invitees.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {invitees.map((m, i) => (
              <div
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              >
                {m}
                <button
                  onClick={() => dispatch(removeInvitee(m))}
                  className="text-blue-500 hover:text-red-500"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No invitees added yet.</p>
        )}
      </div>

      {/* Input and Add Button */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Add
        </button>
      </div>
      {
        invitees.length>0&&<button
          type="button"
          onClick={() => setStep(6)}
          disabled={invitees.length==0}
          className={`px-6 py-2 m-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            invitees.length>0
              ? 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
          }`}
        >
          Next
        </button>
      }

     
    </div>
  );
};

export default Invites;
