//Impots :
import { createSlice } from "@reduxjs/toolkit";
import { fetchBatteryData, searchBatteryData } from "../Actions/batteryDataAction";

//State Variables' initalization
const initialState = {
  completeData: null,
  isFilter: false,
  filterData: null,
  loading: true,
  error: null,
};

//Creating slice using createSlice method
const batteryDataSlice = createSlice({
  name: "batteryData",
  initialState,
  reducers: {
    setSearchFilterById: searchBatteryData
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBatteryData.pending, (state) => {
        console.log("Pending action dispatched");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatteryData.fulfilled, (state, action) => {
        console.log("Fulfilled action dispatched");
        state.completeData = action.payload;
        state.loading = false;
      })
      .addCase(fetchBatteryData.rejected, (state, action) => {
        console.log("Rejected action dispatched");
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSearchFilterById } = batteryDataSlice.actions;
export default batteryDataSlice.reducer;
