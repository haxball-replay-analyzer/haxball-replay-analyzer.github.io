import { configureStore } from '@reduxjs/toolkit'
import mainModeReducer from './slices/mainModeSlice'

export default configureStore({
  reducer: {
    mainMode: mainModeReducer,
  },
})