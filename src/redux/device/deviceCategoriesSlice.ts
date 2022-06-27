import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiVersion, baseUrl } from '../configureStore';

export const fetchDeviceCategories = createAsyncThunk(
  'deviceCategories/fetch',
  async () => {
    const response = await fetch(`${baseUrl}${apiVersion}device_categories`)

    return await response.json();
  }
);

export const createDeviceCategory = createAsyncThunk(
  'deviceCategories/create',
  async (deviceCategory: { device_name: string, device_items: string, price: number }) => {
    const response = await fetch(`${baseUrl}${apiVersion}device_categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceCategory),
    });

    return await response.json();
  });

const initialState = {
  categories: [{ id: 1, name: '', items: '', price: 0 }]
}

const deviceSlice = createSlice({
  name: 'deviceCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeviceCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });

    builder.addCase(createDeviceCategory.fulfilled, (state, { payload }) => {
      state.categories.push(payload);
    });
  }
})

export const deviceReducer = deviceSlice.reducer