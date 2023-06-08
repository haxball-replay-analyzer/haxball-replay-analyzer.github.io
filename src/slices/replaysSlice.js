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
    player4Search: null
  },
  reducers: {
    setReplays: (state, action) => {
      state.replays = action.payload
    },
    setReplaysType: (state, action) => {
      state.type = action.payload
    },
    setReplaysLoaded: (state, action) => {
      state.loaded = action.payload
    },
    setPlayer4Search: (state, action) => {
      state.player4Search = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setReplays, setReplaysType, setReplaysLoaded, setPlayer4Search } = replaysSlice.actions

export default replaysSlice.reducer