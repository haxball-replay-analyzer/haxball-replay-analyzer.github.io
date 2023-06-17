import { createSlice } from '@reduxjs/toolkit'

export const replaysSlice = createSlice({
  name: 'replays',
  initialState: {
    replays: [{
      name: 'dupa',
      views: 3
    }],
    type: 'mostViewed',
    loaded: false,
    player4Search: null,
    filters: {
      player: true,
      replay: false,
      team: false,
      goal: false,
      stadium: false,
      realSoccer: false,
      spaceMode: false,
      searchText: '',
      period: 'week',
      startDate: null,
      endDate: null,
    },
    loadingMore: false,
    allReplaysLoaded: false
  },
  reducers: {
    setReplays: (state, action) => {
      state.replays = action.payload
      if (action.payload.replays.length < 10) state.allReplaysLoaded = true
      else state.allReplaysLoaded = false
    },
    addMoreReplays: (state, action) => {
      if (!state.allReplaysLoaded) {
        state.replays = {
          goals: state.replays.goals.concat(action.payload.goals),
          matches: state.replays.matches.concat(action.payload.matches),
          players: state.replays.players.concat(action.payload.players),
          replayId: state.replays.replayId.concat(action.payload.replayId),
          replays: state.replays.replays.concat(action.payload.replays),
          teams: state.replays.teams.concat(action.payload.teams)
        }
        if (action.payload.replays.length < 10) state.allReplaysLoaded = true
        else state.allReplaysLoaded = false
      }
    },
    setReplaysType: (state, action) => {
      state.type = action.payload
    },
    setReplaysLoaded: (state, action) => {
      state.loaded = action.payload
    },
    setPlayer4Search: (state, action) => {
      state.player4Search = action.payload
    },
    setFilterPlayer: (state, action) => {
      state.filters.player = action.payload
    },
    setFilterTeam: (state, action) => {
      state.filters.team = action.payload
    },
    setFilterReplay: (state, action) => {
      state.filters.replay = action.payload
    },
    setFilterGoal: (state, action) => {
      state.filters.goal = action.payload
    },
    setFilterStadium: (state, action) => {
      state.filters.stadium = action.payload
    },
    setFilterSpaceMode: (state, action) => {
      state.filters.spaceMode = action.payload
    },
    setFilterRealSoccer: (state, action) => {
      state.filters.realSoccer = action.payload
    },
    setStartDate: (state, action) => {
      state.filters.startDate = action.payload
    },
    setEndDate: (state, action) => {
      state.filters.endDate = action.payload
    },
    setSearchText: (state, action) => {
      state.filters.searchText = action.payload
    },
    setPeriodState: (state, action) => {
      state.filters.period = action.payload
    },
    setLoadingMore: (state, action) => {
      state.loadingMore = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setReplays, addMoreReplays, setStartDate, setEndDate, setReplaysType, setReplaysLoaded, setPlayer4Search, setFilterPlayer, setFilterTeam, setFilterReplay, setFilterGoal, setFilterStadium, setFilterSpaceMode, setFilterRealSoccer, setSearchText, setPeriodState, setLoadingMore } = replaysSlice.actions

export default replaysSlice.reducer