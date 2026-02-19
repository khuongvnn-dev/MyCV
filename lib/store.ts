import { configureStore } from '@reduxjs/toolkit'
import sheetSlice from './gg_sheet/sheetSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      google_sheet: sheetSlice 
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']