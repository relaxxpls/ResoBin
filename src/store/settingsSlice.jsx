import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',

  initialState: {
    theme: 'device',
    tracking: true,
    notifications: false,
  },

  reducers: {
    setSettings: (state, { payload }) => {
      state.theme = payload.theme
      state.tracking = payload.tracking
      state.notifications = payload.notifications
    },
  },
})

// ? actions
// * same names as that set inside reducers key of createSlice
export const { setSettings } = settingsSlice.actions

// ? selectors
// * naming convention: https://twitter.com/_jayphelps/status/739905438116806656
// * avoid using inline selectors
export const selectSettings = (state) => state.settings
export const selectTheme = (state) => {
  const { theme } = state.settings
  if (theme !== 'device') return theme

  return window.matchMedia?.('(prefers-color-scheme: light)')?.matches
    ? 'light'
    : 'dark'
}

// ? reducer
// * always export reducer as default
export default settingsSlice.reducer
