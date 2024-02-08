import {configureStore} from "@reduxjs/toolkit"
import noteSlice from "./noteSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
      note: noteSlice,
      user: userSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;