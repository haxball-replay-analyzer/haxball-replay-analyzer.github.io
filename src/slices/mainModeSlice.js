import { createSlice } from '@reduxjs/toolkit'

export const mainModeSlice = createSlice({
  name: 'mainMode',
  initialState: {
    value: 'home',
    version: '2.0.0',
    userUploaded: false
  },
  reducers: {
    setMainMode: (state, action) => {
      state.value = action.payload
    },
    setVersion: (state, action) => {
      state.version = action.payload
    },
    setUserUploaded: (state, action) => {
      state.userUploaded = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMainMode, setVersion, setUserUploaded } = mainModeSlice.actions

export default mainModeSlice.reducer