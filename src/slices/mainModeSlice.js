import { createSlice } from '@reduxjs/toolkit'

export const mainModeSlice = createSlice({
  name: 'mainMode',
  initialState: {
    value: 'home',
    version: '1.17'
  },
  reducers: {
    setMainMode: (state, action) => {
      state.value = action.payload
    },
    setVersion: (state, action) => {
      state.version = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMainMode, setVersion } = mainModeSlice.actions

export default mainModeSlice.reducer