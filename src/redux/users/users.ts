import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiVersion, baseUrl } from '../configureStore';

export const createDoctor = createAsyncThunk(
  'users/createDoctor',
  async (doctorFormData: FormData) => {
    const response = await fetch(`${baseUrl}${apiVersion}doctors`, {
      method: 'POST',
      body: doctorFormData,
    });
    const data = await response.json();
    console.log(data);
    return data;
  },
);

interface IState {
  id: number;
}

interface RoleDoctorInfo {
  specialization: string;
  experience: number;
  salary: number;
  certificates: string[];
}

interface RolePatientInfo {
  weight: number;
  height: number;
  covid: boolean;
  hypertension: boolean;
  diabetes: boolean;
  otherDiseases: string;
}

type RoleInfo = RoleDoctorInfo | RolePatientInfo;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      userInfo: {
        id: 0,
        profilePic: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        referenceId: '',
        bio: '',
        phone: '',
        address: '',
        gender: '',
        birthDate: '',
        age: 0,
        roleInfo: {} as RoleInfo,
      },
      loading: 'idle',
      authorizationToken: '',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDoctor.fulfilled, (state, { payload }) => {
      state.user.userInfo.referenceId = payload.id;
      state.user.userInfo.roleInfo = {
        specialization: payload.specialization,
        experience: payload.years_experience,
        salary: payload.salary,
        certificates: payload.certificates,
      };
    });

    builder.addCase(createDoctor.pending, (state, action) => {
      state.user.loading = 'pending';
    });

    builder.addCase(createDoctor.rejected, (state, action) => {
      state.user.loading = 'rejected';
    });
  },
});

export const userReducer = userSlice.reducer;
// export const {} = userSlice.actions;
