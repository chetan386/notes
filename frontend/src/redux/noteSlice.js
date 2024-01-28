import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const noteSlice = createSlice({
    name: "note",
    initialState:{
        status: "idle",
        notes: []
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getNotes.fulfilled,(state,action)=>{
            state.notes = action.payload;
            state.status = "fulfiled"
        })
        .addCase(getNotes.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(getNotes.rejected,(state,action)=>{
           state.status = "rejected"
        })
        .addCase(deleteNote.fulfilled,(state,action)=>{
          state.notes = action.payload
          state.status= "fulfilled"
        })
        .addCase(deleteNote.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(deleteNote.rejected,(state,action)=>{
           state.status = "rejected"
        })
        .addCase(createNote.fulfilled,(state,action)=>{
            state.notes = action.payload
           state.status = "fulfilled"
        })
        .addCase(createNote.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(createNote.rejected,(state,action)=>{
           state.status = "rejected"
        })
        .addCase(updatedNote.fulfilled,(state,action)=>{
            state.notes = action.payload
           state.status = "fulfilled"
        })
        .addCase(updatedNote.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(updatedNote.rejected,(state,action)=>{
           state.status = "rejected"
        })
        
    }
})

export default noteSlice.reducer;


export const getNotes = createAsyncThunk('notes/get',async()=>{
      const response = await axios.get("/api/api/v1")
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
    // console.log(obj)
     const response = await axios.put(`/api/api/v1/${obj.id}`,{
        title: obj.title,
        content: obj.content,
        category: obj.category
     })
     return response
})