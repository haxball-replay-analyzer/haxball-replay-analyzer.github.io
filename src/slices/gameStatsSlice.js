import { createSlice } from '@reduxjs/toolkit'

export const gameStatsSlice = createSlice({
  name: 'gameStats',
  initialState: {
    divStyle: {},
    matches: [],
    selectedMatch: 0,
    selectedStat: -1
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
      state.selectedMatch = action.payload
    },
    selectStat: (state, action) => {
      state.selectedStat = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDivStyle, setStats, showNextMatch, showPreviousMatch, selectMatch, selectStat } = gameStatsSlice.actions

export default gameStatsSlice.reducer