import { createSlice } from '@reduxjs/toolkit'

export const gameStatsSlice = createSlice({
  name: 'gameStats',
  initialState: {
    divStyle: {},
    matches: [],
    previousStats: [],
    playerPos: [],
    playerList: [],
    selectedMatch: 0,
    selectedStat: -1,
    selectedPlayer: -1,
    selectedHeatmap: 'Heatmap',
    connectHalves: false,
    connectedHalves: false,
    redTeamNames: [],
    blueTeamNames: []
  },
  reducers: {
    setDivStyle: (state, action) => {
      state.divStyle = action.payload
    },
    setStats: (state, action) => {
      // Mecze bez ani jednego ticku gry (gameTicks -1) odpadają; setPlayerPos usuwa te same indeksy (puste pozycje).
      // filter zamiast splice w pętli: splice pomijał element po usuniętym i zmieniał tablicę nadawcy (TD-011).
      var matches = action.payload.filter(match => !(match.gameTicks < 0));
      state.previousStats = state.matches;
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
      var x = action.payload.filter(pos => pos.length !== 0);
      // Zamrożenie z wierzchu: Immer pomija zamrożone wartości, więc nie przechodzi po wszystkich punktach
      // (wyścig 24 aut: 2,2 mln obiektów {x, y}, ok. 0,9 s blokady strony przy głębokim zamrażaniu).
      // Nikt nie zmienia playerPos poza tym reduktorem, a głęboko zamrożone było i tak tylko do odczytu.
      state.playerPos = Object.freeze(x);
    },
    setPlayerList: (state, action) => {
      state.playerList = action.payload
    },
    // Przed analizą nowej powtórki. Dawne przypisanie `state = {...}` nic nie zmieniało (TD-011).
    // Nazwy drużyn i connectHalves zostają: powtórka z serwera dostaje je przed analizą (`replaySent`).
    clearStats: (state) => {
      Object.assign(state, {
        divStyle: {},
        matches: [],
        previousStats: [],
        playerPos: [],
        playerList: [],
        selectedMatch: 0,
        selectedStat: -1,
        selectedPlayer: -1,
        selectedHeatmap: 'Heatmap'
      })
    },
    setConnectHalves: (state, action) => {
      state.connectHalves = action.payload
    },
    setRedTeamName: (state, action) => {
      state.redTeamNames[action.payload.mtc] = action.payload.name
    },
    setBlueTeamName: (state, action) => {
      state.blueTeamNames[action.payload.mtc] = action.payload.name
    },
    splitHalves: (state) => {
      state.matches = state.previousStats;
    },
    setConnectedHalves: (state, action) => {
      state.connectedHalves = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { testFunction, setDivStyle, setStats, showNextMatch, showPreviousMatch, selectMatch, selectStat, selectPlayer, selectHeatmap, setPlayerList, setPlayerPos, clearStats, setConnectHalves, setRedTeamName, setBlueTeamName, splitHalves, setConnectedHalves } = gameStatsSlice.actions

export default gameStatsSlice.reducer