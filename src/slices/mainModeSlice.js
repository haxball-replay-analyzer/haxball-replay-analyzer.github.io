import { createSlice } from '@reduxjs/toolkit'

export const mainModeSlice = createSlice({
  name: 'mainMode',
  initialState: {
    value: 'home',
  },
  reducers: {
    setMainMode: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMainMode } = mainModeSlice.actions

export default mainModeSlice.reducer