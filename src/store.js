import { configureStore } from '@reduxjs/toolkit'
import mainModeReducer from './slices/mainModeSlice'
import gameStatsReducer from './slices/gameStatsSlice'
import replaysReducer from './slices/replaysSlice'

// Kontrole Redux Toolkit (tylko w trybie deweloperskim) przechodzą przy każdym dispatch cały stan.
// playerPos to do 2,2 mln punktów (wyścig 24 aut): bez wyłączenia każda akcja blokowała stronę
// na 0,7–1,7 s, a ekran „Analyzing...” stał ok. 6 s na 98% (TD-040). playerPos to zwykłe liczby,
// zamrożone w setPlayerPos, więc obie kontrole nic tu nie wnoszą.
export default configureStore({
  reducer: {
    mainMode: mainModeReducer,
    gameStats: gameStatsReducer,
    replays: replaysReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: { ignoredPaths: ['gameStats.playerPos'], ignoredActions: ['gameStats/setPlayerPos'] },
    immutableCheck: { ignoredPaths: ['gameStats.playerPos'] }
  })
})
