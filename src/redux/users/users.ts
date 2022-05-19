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

    return data;
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userFormData: FormData) => {
    const response = await fetch(`${baseUrl}users`, {
      method: 'POST',
      body: userFormData,
    });
    const data = await response.json();
    console.log({ data, authorization: response.headers.get('authorization') });
    return { data, authorization: response.headers.get('authorization') };
  },
);

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
    userInfo: {
      id: 0,
      profilePic: '',
      firstName: '',
      lastName: '',
      email: '',
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
    auth: {
      token: '',
      isAuthenticated: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDoctor.fulfilled, (state, { payload }) => {
      state.userInfo.referenceId = payload.id;
      state.userInfo.roleInfo = {
        specialization: payload.specialization,
        experience: payload.years_experience,
        salary: payload.salary,
        certificates: payload.certificates,
      };
    });

    builder.addCase(createDoctor.pending, (state, action) => {
      state.loading = 'pending';
    });

    builder.addCase(createDoctor.rejected, (state, action) => {
      state.loading = 'rejected';
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.userInfo.id = payload.data.id;
      state.userInfo.address = payload.data.user.address;
      state.userInfo.bio = payload.data.user.bio;
      state.userInfo.birthDate = payload.data.user.birth_date;
      state.userInfo.email = payload.data.user.email;
      state.userInfo.firstName = payload.data.user.first_name;
      state.userInfo.lastName = payload.data.user.last_name;
      state.userInfo.role = payload.data.user.role;
      state.userInfo.phone = payload.data.user.phone;
      state.userInfo.profilePic = payload.data.user.profile_pic;
      state.userInfo.id = payload.data.user.id;
      state.loading = 'idle';
    });

    builder.addCase(createUser.pending, (state, action) => {
      state.loading = 'pending';
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export const userReducer = userSlice.reducer;
// export const {} = userSlice.actions;
