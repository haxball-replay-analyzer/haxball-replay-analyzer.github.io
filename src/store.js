import { configureStore } from '@reduxjs/toolkit'
import mainModeReducer from './slices/mainModeSlice'
import gameStatsReducer from './slices/gameStatsSlice'

export default configureStore({
  reducer: {
    mainMode: mainModeReducer,
    gameStats: gameStatsReducer
  },
})