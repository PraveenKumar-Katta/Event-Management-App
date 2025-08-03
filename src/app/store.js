import { configureStore } from "@reduxjs/toolkit";
import eventCreationReducer from '../features/eventCreationSlice'
import authReducer from '../features/authslice'
import eventReducer from '../features/eventsSlice'

const store=configureStore({
    reducer:{
        eventCreation:eventCreationReducer,
        auth:authReducer,
        events:eventReducer
    }
})

export default store