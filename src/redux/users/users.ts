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

    return await response.json();
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

export const login = createAsyncThunk(
  'users/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(`${baseUrl}users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const authorization = response.headers.get('Authorization');
    if (authorization) localStorage.setItem('authorization', authorization);
    const data = await response.json();
    return { ...data, authorization };
  },
);

export const userFromToken = createAsyncThunk(
  'users/userFromToken',
  async (token: string) => {
    const response = await fetch(`${baseUrl}member-data`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    return await response.json();
  },
);

export const logout = createAsyncThunk('users/logout', async () => {
  const response = await fetch(`${baseUrl}users/sign_out`, {
    method: 'DELETE',
  });
});

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
  smoking: boolean;
  hypertension: boolean;
  diabetes: boolean;
  otherDiseases: string;
}

type AuthToken = string | null | undefined;

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
      token: '' as AuthToken,
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
      if ('errors' in payload.data) {
        state.loading = 'rejected';
        state.errors = payload.data.errors[0];
      } else {
        state.userInfo.id = payload.data.id;
        state.userInfo.address = payload.data.user.address;
        state.userInfo.bio = payload.data.user.bio;
        state.userInfo.birthDate = payload.data.user.birth_date;
        state.userInfo.gender = payload.data.user.gender;
        state.userInfo.email = payload.data.user.email;
        state.userInfo.firstName = payload.data.user.first_name;
        state.userInfo.lastName = payload.data.user.last_name;
        state.userInfo.role = payload.data.user.role;
        state.userInfo.phone = payload.data.user.phone;
        state.userInfo.profilePic = payload.data.user.profile_pic;
        state.userInfo.id = payload.data.user.id;
        state.auth.token = payload.authorization;
        state.auth.isAuthenticated = true;
        state.loading = 'idle';
      }
    });

    builder.addCase(createUser.pending, (state) => {
      state.loading = 'pending';
      state.errors = '';
    });

    builder.addCase(createUser.rejected, (state) => {
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
        smoking: payload.smoking,
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

    builder.addCase(login.fulfilled, (state, { payload }) => {
      if ('error' in payload) {
        state.errors = payload.error;
      } else {
        state.userInfo = {
          ...payload.userInfo,
          roleInfo: payload.roleInfo,
        };
        state.auth.token = payload.authorization;
        state.auth.isAuthenticated = true;
      }
      state.loading = 'idle';
    });

    builder.addCase(login.pending, (state) => {
      state.loading = 'pending';
      state.errors = '';
    });

    builder.addCase(login.rejected, (state) => {
      state.loading = 'rejected';
    });

    builder.addCase(userFromToken.fulfilled, (state, { payload }) => {
      state.userInfo = {
        ...payload.userInfo,
        roleInfo: payload.roleInfo,
      };
      state.auth.token = localStorage.getItem('authorization');
      state.auth.isAuthenticated = true;
      state.loading = 'idle';
    });

    builder.addCase(userFromToken.pending, (state) => {
      state.loading = 'pending';
    });

    builder.addCase(userFromToken.rejected, (state) => {
      state.loading = 'rejected';
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.auth.token = '';
      state.auth.isAuthenticated = false;
      localStorage.removeItem('authorization');
    });
  },
});

export const userReducer = userSlice.reducer;
// export const {} = userSlice.actions;
