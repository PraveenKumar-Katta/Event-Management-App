import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../utils/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
export const signUpUser=createAsyncThunk(
    'auth/signUpUser',
    async({email,password},{rejectWithValue})=>{
        try {
            const userCredientials=await createUserWithEmailAndPassword(auth,email,password)
            const userId=userCredientials.user.uid
            const user={email,userId}
            const name=email.split("@")[0]
            await setDoc(doc(db,"users",userId),{
                name,
                email
            })
            return email
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)
export const logInUser=createAsyncThunk(
    'auth/logInUser',
    async ({email,password},rejectWithValue)=>{
        try {
            const userCredientials=await signInWithEmailAndPassword(auth,email,password)
            const userId=userCredientials.user.uid
            let userSnap=await getDoc(doc(db,"users",userId))
            if(userSnap.exists()){
                const userData= userSnap.data()
                localStorage.setItem("user",JSON.stringify({userId,...userData}))
                return {userId,...userData}
            }
        } catch (error) {
            alert(error.message)
            return rejectWithValue(error.message)
        }

    }
)

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
        message:null
    },
    reducers:{
        logout:(state)=>{
            state.user=null
            localStorage.removeItem("user")
        }
    },
    extraReducers:(builder)=>{
        builder
        //singUp
        .addCase(signUpUser.fulfilled,(state,action)=>{
            state.loading=false
            state.message=`${action.payload} Registered Sucessfully, redirecting to login...`
        })
        .addCase(signUpUser.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(signUpUser.pending,(state,action)=>{
            state.loading=true
        })

        //LogIn
        .addCase(logInUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(logInUser.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(logInUser.pending,(state,action)=>{
            state.loading=true
        })
    }
})

export default authSlice.reducer
export const {logout} = authSlice.actions