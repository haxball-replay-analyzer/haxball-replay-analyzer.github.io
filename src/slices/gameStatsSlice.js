import { createSlice } from '@reduxjs/toolkit'

export const gameStatsSlice = createSlice({
  name: 'gameStats',
  initialState: {
    divStyle: {},
  },
  reducers: {
    setDivStyle: (state, action) => {
      state.divStyle = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDivStyle } = gameStatsSlice.actions

export default gameStatsSlice.reducer