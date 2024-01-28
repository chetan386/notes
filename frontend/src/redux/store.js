import {configureStore} from "@reduxjs/toolkit"
import noteSlice from "./noteSlice";

const store = configureStore({
    reducer:{
      note: noteSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;