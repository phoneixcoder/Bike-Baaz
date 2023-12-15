import { configureStore } from '@reduxjs/toolkit'
import BatterDataSlice from "../Redux/Slice/BatterDataSlice";

export const store = configureStore({
  reducer: {
    batteryStore : BatterDataSlice
  }
});
