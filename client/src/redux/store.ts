import { configureStore } from '@reduxjs/toolkit'
import dashboardHelperReducer from './dashboardHelperSlices';


const store = configureStore({
  reducer: {
    dashboardHelper: dashboardHelperReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;