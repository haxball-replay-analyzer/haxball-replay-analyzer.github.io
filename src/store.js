import { configureStore } from '@reduxjs/toolkit'
import mainModeReducer from './slices/mainModeSlice'
import gameStatsReducer from './slices/gameStatsSlice'
import replaysReducer from './slices/replaysSlice'

export default configureStore({
  reducer: {
    mainMode: mainModeReducer,
    gameStats: gameStatsReducer,
    replays: replaysReducer
  },
})