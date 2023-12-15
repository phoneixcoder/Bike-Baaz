import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://dev.electorq.com/dummy/battery";

export const fetchBatteryData = createAsyncThunk(
  "batteryData/fetchBatteryData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}`);
      const jsonData = JSON.parse(response.data.body);
      return jsonData;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const searchBatteryData = (state, action) => {
  const searchTerm = parseInt(action.payload);
  if (searchTerm >= 0) {
    state.isFilter = true;
    state.filterData = state.completeData.filter(
      (item) => item.id === searchTerm
    );
  }else{
    state.isFilter = false;
  }
};
