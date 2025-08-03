import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export const fetchEvents=createAsyncThunk(
    'events/fetchEvents',
    async(_,{rejectWithValue})=>{
        try {
            let eventsSnap=await getDocs(collection(db,"events"))
            const events = eventsSnap.docs.map(doc => ({
                id: doc.id,
                createdAt: doc.data().createdAt?.toDate?.().toISOString() || null,
                ...doc.data()
            }));
            return events;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const eventSlice=createSlice({
    name:"events",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    reducers:{
        addEvent:(state,action)=>{
            state.data=[...state.data,action.payload]   
        },
       updateStatusAccept: (state, action) => {
        const { id, email } = action.payload;
            state.data = state.data.map((event) => {
                if (event.id === id) {
                return {
                    ...event,
                    invitees: {
                    ...event.invitees,
                    [email]: "accepted"
                    }
                };
                }
                return event;
            });
        },
        updateStatusReject:(state,action)=>{
            const {id,email}=action.payload
            state.data=state.data.map((e)=>{
                if(e.id==id){
                   return {
                    ...e,
                    invitees:{
                        ...e.invitees,
                        [email]:"rejected"
                    }
                   }
                }
                return e
            })
        },
        deleteevent:(state,action)=>{
            state.data=state.data.filter((e)=>{
               return e.id!==action.payload
            })
        }
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchEvents.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
            
        })
        .addCase(fetchEvents.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            
        })
        .addCase(fetchEvents.pending,(state,action)=>{
            state.loading=true
        })
    }
})

export const {updateStatusAccept,updateStatusReject,deleteevent,addEvent}=eventSlice.actions
export default eventSlice.reducer