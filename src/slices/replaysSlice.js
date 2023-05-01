import { createSlice } from '@reduxjs/toolkit'

export const replaysSlice = createSlice({
  name: 'replays',
  initialState: {
    replays: [{
      name: 'dupa',
      views: 3
    }],
    type: 'mostViewed'
  },
  reducers: {
    setReplays: (state, action) => {
      state.replays = action.payload
    },
    setReplaysType: (state, action) => {
      state.type = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setReplays, setReplaysType } = replaysSlice.actions

export default replaysSlice.reducer