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
    selectedPlayer: -1,
    selectedHeatmap: 'Heatmap'
  },
  reducers: {
    setDivStyle: (state, action) => {
      state.divStyle = action.payload
    },
    setStats: (state, action) => {
      var matches = action.payload;
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].gameTicks < 0) matches.splice(i, 1);
      }
      state.matches = matches;
      state.selectedMatch = 0;
      state.selectedPlayer = -1;
      state.selectedStat = -1;
      state.selectedHeatmap = 'Heatmap';
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
    selectHeatmap: (state, action) => {
      state.selectedHeatmap = action.payload
    },
    setPlayerPos: (state, action) => {
      var x = action.payload;
      for (var i = 0; i < x.length; i++) {
        if (x[i].length === 0) x.splice(i, 1);
      }
      state.playerPos = x;
    },
    setPlayerList: (state, action) => {
      state.playerList = action.payload
    },
    clearStats: (state) => {
      state = {
        divStyle: {},
        matches: [],
        playerPos: [],
        playerList: [],
        selectedMatch: 0,
        selectedStat: -1,
        selectedPlayer: -1,
        selectedHeatmap: 'Heatmap'
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDivStyle, setStats, showNextMatch, showPreviousMatch, selectMatch, selectStat, selectPlayer, selectHeatmap, setPlayerList, setPlayerPos, clearStats } = gameStatsSlice.actions

export default gameStatsSlice.reducer