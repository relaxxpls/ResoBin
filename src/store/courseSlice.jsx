import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ? async actions
export const getCourseList = createAsyncThunk(
  'course/getCourseList',
  async () =>
    axios.get('https://run.mocky.io/v3/327e45a5-e2da-4859-b4ad-688cb6328bd1')
)

// ? reducer
const courseSlice = createSlice({
  name: 'course',

  initialState: {
    list: [],
    loading: false,
    search: '',
  },

  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload
    },
  },

  extraReducers: {
    [getCourseList.fulfilled]: (state, { payload }) => {
      state.list = payload.data
      state.loading = false
    },
    [getCourseList.pending]: (state) => {
      state.loading = true
    },
    [getCourseList.rejected]: (state) => {
      state.loading = false
    },
  },
})

// ? actions
export const { setSearch } = courseSlice.actions

// ? selectors
export const selectCourseList = (state) => state.course.list
export const selectCourseSearch = (state) => state.course.search
export const selectCourseAPILoading = (state) => state.course.loading

export default courseSlice.reducer
