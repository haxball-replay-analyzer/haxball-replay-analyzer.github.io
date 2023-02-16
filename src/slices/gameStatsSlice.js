import { createSlice } from '@reduxjs/toolkit'

export const gameStatsSlice = createSlice({
  name: 'gameStats',
  initialState: {
    divStyle: {},
    matches: [],
    playerPos: [],
    playerList: [],
    selectedMatch: 0,
    selectedStat: -1,
    selectedPlayer: -1
  },
  reducers: {
    setDivStyle: (state, action) => {
      state.divStyle = action.payload
    },
    setStats: (state, action) => {
      state.matches = action.payload
    },
    showNextMatch: (state) => {
      state.selectedMatch++
    },
    showPreviousMatch: (state) => {
      state.selectedMatch--;
    },
    selectMatch: (state, action) => {
      state.selectedMatch = Number(action.payload)
    },
    selectStat: (state, action) => {
      state.selectedStat = action.payload
    },
    selectPlayer: (state, action) => {
      state.selectedPlayer = action.payload
    },
    setPlayerPos: (state, action) => {
      state.playerPos = action.payload
    },
    setPlayerList: (state, action) => {
      state.playerList = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDivStyle, setStats, showNextMatch, showPreviousMatch, selectMatch, selectStat, selectPlayer, setPlayerList, setPlayerPos } = gameStatsSlice.actions

export default gameStatsSlice.reducer