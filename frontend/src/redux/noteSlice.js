import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const noteSlice = createSlice({
    name: "note",
    initialState:{
        status: "idle",
        notes: [],
        render: true,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getNotes.fulfilled,(state,action)=>{
            state.notes = action.payload;
            state.status = "fulfilled"
            state.render= true
            if(action.payload.data.message==="Invalid token"){
                state.status = "expire"
            }
        })
        .addCase(getNotes.pending,(state,action)=>{
            state.status = "pending"
            state.render= true
        })
        .addCase(getNotes.rejected,(state,action)=>{
           state.status = "rejected"
           state.render= true
        })
        .addCase(deleteNote.fulfilled,(state,action)=>{
          state.notes = action.payload
          state.status= "deleted"
          state.render= false
        })
        .addCase(deleteNote.pending,(state,action)=>{
            state.status = "pending"
            state.render= true
        })
        .addCase(deleteNote.rejected,(state,action)=>{
           state.status = "rejected"
           state.render= true
        })
        .addCase(createNote.fulfilled,(state,action)=>{
            state.notes = action.payload
           state.status = "created"
           state.render= false
        })
        .addCase(createNote.pending,(state,action)=>{
            state.status = "pending"
            state.render= true
        })
        .addCase(createNote.rejected,(state,action)=>{
           state.status = "rejected"
           state.render= true
        })
        .addCase(updatedNote.fulfilled,(state,action)=>{
            state.notes = action.payload
           state.status = "updated"
           state.render= false
        })
        .addCase(updatedNote.pending,(state,action)=>{
            state.status = "pending"
            state.render= true
        })
        .addCase(updatedNote.rejected,(state,action)=>{
           state.status = "rejected"
           state.render= true
        })

    }
})

export default noteSlice.reducer;


export const getNotes = createAsyncThunk('notes/get',async(obj1)=>{
   const {search , filter,sort} = obj1
      const response = await axios.get(`/api/api/v1?search=${search}&filter=${filter}&sort=${sort}`,{
        withCredentials: true,
      })

      return response;
})

export const deleteNote = createAsyncThunk('note/delete',async(id)=>{
       await axios.delete(`/api/api/v1/${id}`)
       const response = await axios.get("/api/api/v1")
      return response
})
export const createNote = createAsyncThunk('note/create',async(obj)=>{
       const response = await axios.post("/api/api/v1/new",obj)
      return response
})

export const updatedNote = createAsyncThunk("note/update",async(obj)=>{
    
     const response = await axios.put(`/api/api/v1/${obj.id}`,{
        title: obj.title,
        content: obj.content,
        category: obj.category
     })
    
     return response
})

