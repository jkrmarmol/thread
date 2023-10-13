import { createSlice } from '@reduxjs/toolkit'
import type { IDashboardHelperInitialState } from '../typings/interfaces';


let initialState: IDashboardHelperInitialState = {
  goBackNavigation: [],
  threadPostText: ' ',
  activityCurrentTab: 'All'
}

const dashboardHelperSlices = createSlice({
  name: 'dashboardHelperSlices',
  initialState,
  reducers: {
    goBackNavigation: (state, action) => {
      state.goBackNavigation = [...state.goBackNavigation, action.payload]
    },
    threadPostText: (state, action) => {
      state.threadPostText = action.payload
    },
    activityCurrentTab: (state, action) => {
      state.activityCurrentTab = action.payload;
    }
  }
})

export const { goBackNavigation, threadPostText, activityCurrentTab } = dashboardHelperSlices.actions;
export default dashboardHelperSlices.reducer;