import { createSlice } from '@reduxjs/toolkit'

export const replaysSlice = createSlice({
  name: 'replays',
  initialState: {
    replays: [{
      name: 'dupa',
      views: 3
    }]
  },
  reducers: {
    setReplays: (state, action) => {
      state.replays = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setReplays } = replaysSlice.actions

export default replaysSlice.reducer