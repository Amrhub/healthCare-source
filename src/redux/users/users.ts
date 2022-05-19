import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiVersion, baseUrl } from '../configureStore';

export const createDoctor = createAsyncThunk(
  'users/createDoctor',
  async (doctorFormData: FormData) => {
    const response = await fetch(`${baseUrl}${apiVersion}doctors`, {
      method: 'POST',
      body: doctorFormData,
    });

    return await response.json();
  },
);

export const createPatient = createAsyncThunk(
  'users/createPatient',
  async (patientFormData: FormData) => {
    const response = await fetch(`${baseUrl}${apiVersion}patients`, {
      method: 'POST',
      body: patientFormData,
    });

    const data = await response.json();
    console.log(data);
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
    console.log(response);
    const data = await response.json();
    if (response.status === 422) {
      return {
        data: {
          errors: data.errors,
        },
      };
    } else {
      const authorization = response.headers.get('Authorization');
      if (authorization) localStorage.setItem('authorization', authorization);
      return { data, authorization };
    }
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

export type Loading = 'pending' | 'rejected' | 'idle';

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
    loading: 'idle' as Loading,
    errors: '',
    isReferenceCreated: false,
    auth: {
      token: '',
      isAuthenticated: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDoctor.fulfilled, (state, { payload }) => {
      state.userInfo.roleInfo = {
        specialization: payload.specialization,
        experience: payload.years_experience,
        salary: payload.salary,
        certificates: payload.certificates,
      };
      state.isReferenceCreated = true;
      state.userInfo.referenceId = payload.id;
    });

    builder.addCase(createDoctor.pending, (state, action) => {
      state.isReferenceCreated = false;
      state.loading = 'pending';
    });

    builder.addCase(createDoctor.rejected, (state, action) => {
      state.isReferenceCreated = false;
      state.loading = 'rejected';
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      console.log({ errors: payload.data.errors });
      if ('errors' in payload.data) {
        state.loading = 'rejected';
        state.errors = payload.data.errors[0];
      } else {
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
        state.auth.token = payload.authorization?.split(' ')[1] as string;
        state.auth.isAuthenticated = true;
        state.loading = 'idle';
      }
    });

    builder.addCase(createUser.pending, (state, action) => {
      state.loading = 'pending';
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = 'rejected';
    });

    builder.addCase(createPatient.fulfilled, (state, { payload }) => {
      state.userInfo.roleInfo = {
        weight: parseFloat(payload.weight),
        height: parseFloat(payload.height),
        covid: payload.covid,
        hypertension: payload.hypertension,
        diabetes: payload.diabetes,
        otherDiseases: payload.other_diseases_detail,
      };
      state.userInfo.referenceId = payload.id;
      state.isReferenceCreated = true;
      state.loading = 'pending';
    });

    builder.addCase(createPatient.pending, (state) => {
      state.loading = 'pending';
    });

    builder.addCase(createPatient.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export const userReducer = userSlice.reducer;
// export const {} = userSlice.actions;
