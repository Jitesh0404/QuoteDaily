import { configureStore } from '@reduxjs/toolkit'
import quoteSlice from './slices/quoteSlice'

export const store = configureStore({
  reducer: {
    quote:quoteSlice
  },
})