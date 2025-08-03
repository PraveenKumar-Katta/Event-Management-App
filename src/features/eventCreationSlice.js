import { createSlice } from "@reduxjs/toolkit";

const initialState={
        title: "",
        description: "",
        date: "",
        time: "",
        category:"",
        location: {
            lat: null,
            lng: null,
            address: ""
        },
        bannerUrl: "",
        invitees: [],
    }

const eventCreationSlice=createSlice({
    name:"eventCreation",
    initialState,
    reducers:{
        setTitle:(state,action)=>{
            state.title=action.payload
        },
        setDescription:(state,action)=>{
            state.description=action.payload
        },
        setCategory:(state,action)=>{
            state.category=action.payload
        },
        setDate:(state,action)=>{
            state.date=action.payload
        },
        setTime:(state,action)=>{
            state.time=action.payload
        },
        setLocation:(state,action)=>{
            state.location=action.payload
        },
        setBannerUrl:(state,action)=>{
            state.bannerUrl=action.payload
        },
        addInvitee:(state,action)=>{
            if(!state.invitees.includes(action.payload)){
                state.invitees.push(action.payload)
            }   
        },
        removeInvitee:(state,action)=>{
            state.invitees=state.invitees.filter((i)=>i!==action.payload)
        },
        resetEventCreation: () => initialState
    }
})

export const {setTitle,setDescription,setCategory,setDate,setTime,setLocation,setBannerUrl,addInvitee,removeInvitee,resetEventCreation}=eventCreationSlice.actions
export default eventCreationSlice.reducer