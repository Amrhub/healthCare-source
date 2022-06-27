import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiVersion, baseUrl } from '../configureStore';

export const fetchDevices = createAsyncThunk(
  'device/fetchDevices',
  async () => {
    const response = await fetch(
      `${baseUrl}${apiVersion}devices`
    );

    return await response.json();
  });

export const makeDeviceConnection = createAsyncThunk(
  'device/makeDeviceConnection',
  async ({ device_category_id, patient_id }: { device_category_id: number, patient_id: number }) => {
    const response = await fetch(
      `${baseUrl}${apiVersion}devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ device_category_id, patient_id })
    }
    );

    return await response.json();
  });

const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    devices: [{
      "deviceId": 1,
      "patientId": 1,
      "patientName": "",
      "deviceCategoryId": 2,
      "deviceCategory": "ECG"
    }]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.devices = action.payload;
    });

    builder.addCase(makeDeviceConnection.fulfilled, (state, action) => {
      state.devices.push(action.payload);
    });
  }
})

export const deviceReducer = deviceSlice.reducer;