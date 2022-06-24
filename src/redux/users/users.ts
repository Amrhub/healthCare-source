import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userInformation: { userFormData: FormData; userId: number }) => {
    const response = await fetch(
      `${baseUrl}${apiVersion}users/${userInformation.userId}`,
      {
        method: 'PATCH',
        body: userInformation.userFormData,
      },
    );

    return await response.json();
  },
);

export const logout = createAsyncThunk('users/logout', async () => {
  await fetch(`${baseUrl}users/sign_out`, {
    method: 'DELETE',
  });
});

export const makeFriendship = createAsyncThunk(
  'users/makeFriendship',
  async (friendship: { requestee_id: number; requester_id: number }) => {
    const response = await fetch(`${baseUrl}${apiVersion}friendships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(friendship),
    });
    return await response.json();
  },
);

export const cancelFriendship = createAsyncThunk(
  'users/cancelFriendship',
  async (friendship_id: number) => {
    await fetch(`${baseUrl}${apiVersion}friendships/${friendship_id}`, {
      method: 'DELETE',
    });

    return { id: friendship_id };
  },
);

export const acceptFriendship = createAsyncThunk(
  'users/acceptFriendship',
  async (friendship_id: number) => {
    const response = await fetch(`${baseUrl}${apiVersion}friendships/${friendship_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'accepted' }),
    });

    return await response.json();
  },
);

export const fetchFriendships = createAsyncThunk(
  'users/fetchFriendships',
  async (user_id: number) => {
    const response = await fetch(
      `${baseUrl}${apiVersion}show_friendships?user_id=${user_id}`,
    );
    const data = await response.json();
    return data;
  },
);

export const fetchConsultations = createAsyncThunk(
  'users/fetchConsultations',
  async (doctor_id: number) => {
    const response = await fetch(
      `${baseUrl}${apiVersion}observations?doctor_id=${doctor_id}`
    )
    return await response.json();
  }
)

export const fetchConsultants = createAsyncThunk(
  'users/fetchConsultants',
  async (patient_id: number | string) => {
    const response = await fetch(
      `${baseUrl}${apiVersion}observations/my_consultants?patient_id=${patient_id}`
    );
    return await response.json();
  }

)

export const bookConsultation = createAsyncThunk(
  'users/bookConsultation',
  async ({ doctor_id, patient_id }: { doctor_id: number | string, patient_id: string | number }) => {
    const response = await fetch(
      `${baseUrl}${apiVersion}observations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doctor_id, patient_id })
      }
    )

    return await response.json();
  }
)

export const acceptConsultation = createAsyncThunk(
  'users/acceptConsultation',
  async (consultationId: number) => {
    const response = await fetch(
      `${baseUrl}${apiVersion}observations/${consultationId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'accepted' })
      }
    )
    if (response.ok) return consultationId;
    return {
      error: 'Something went wrong x.x'
    }
  }
)

export const rejectConsultation = createAsyncThunk(
  'users/rejectConsultation',
  async (consultationId: number) => {
    const response = await fetch(
      `${baseUrl}${apiVersion}observations/${consultationId}`,
      {
        method: 'DELETE',
      }
    )
    if (response.ok) return consultationId;
    return {
      error: 'Something went wrong x.x'
    }
  }
)

interface Friendship {
  id: number;
  status: 'pending' | 'accepted' | 'blocked';
  requester_id: number;
  requestee_id: number;
  userInfo: {
    id: number;
    name: string;
    profilePic: string;
    role: string;
  };
}

export interface UserGeneralInfo {
  id: number;
  profilePic: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  referenceId: string;
  bio: string;
  phone: string;
  address: string;
  gender: string;
  birthDate: string;
  age: number;
}

const friends = {
  pending: [] as Friendship[],
  accepted: [] as Friendship[],
  blocked: [] as Friendship[],
};

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
    friends,
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
        type: 'doctor',
        specialization: payload.specialization,
        experience: payload.years_experience,
        salary: payload.salary,
        certificates: payload.certificates,
        consultations: []
      };
      state.isReferenceCreated = true;
      state.userInfo.referenceId = payload.id;
    });

    builder.addCase(createDoctor.pending, (state) => {
      state.isReferenceCreated = false;
      state.loading = 'pending';
    });

    builder.addCase(createDoctor.rejected, (state) => {
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
        state.userInfo.age = payload.data.user.age;
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
        type: 'patient',
        deviceId: payload.deviceId,
        hasDeviceConnected: !!payload.deviceId,
        weight: parseFloat(payload.weight),
        height: parseFloat(payload.height),
        covid: payload.covid,
        hypertension: payload.hypertension,
        diabetes: payload.diabetes,
        otherDiseases: payload.other_diseases_detail,
        smoking: payload.smoking,
        consultants: []
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
          roleInfo: {
            ...payload.roleInfo,
            hasDeviceConnected: !!payload.roleInfo.deviceId,
            type: payload.userInfo.role
          },
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
        roleInfo: {
          ...payload.roleInfo,
          type: payload.userInfo.role,
          hasDeviceConnected: !!payload.roleInfo.deviceId
        },
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
      state.loading = 'idle';
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = 'pending';
    });

    builder.addCase(makeFriendship.fulfilled, (state, { payload }) => {
      state.friends.pending.push(payload);
    });

    builder.addCase(cancelFriendship.fulfilled, (state, { payload }) => {
      state.friends.pending = state.friends.pending.filter(
        (friend) => friend.id !== payload.id,
      );
      state.friends.accepted = state.friends.accepted.filter(
        (friend) => friend.id !== payload.id,
      );
    });

    builder.addCase(acceptFriendship.fulfilled, (state, { payload }) => {
      const oldStatus = state.friends.pending.find(
        (friend) => friend.id === payload.id,
      ) as Friendship;
      state.friends.accepted.push({ ...oldStatus, status: 'accepted' });
      state.friends.pending = state.friends.pending.filter(
        (friend) => friend.id !== payload.id,
      );
    });

    builder.addCase(fetchFriendships.fulfilled, (state, { payload }) => {
      state.friends = payload;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
    });

    builder.addCase(fetchConsultations.fulfilled, (state, { payload }) => {
      if (state.userInfo.roleInfo.type === "patient") return;
      state.userInfo.roleInfo = {
        ...state.userInfo.roleInfo,
        consultations: payload
      }
    });

    builder.addCase(fetchConsultants.fulfilled, (state, { payload }) => {
      if (state.userInfo.roleInfo.type === "doctor") return;
      state.userInfo.roleInfo = {
        ...state.userInfo.roleInfo,
        consultants: payload
      }
    });

    builder.addCase(acceptConsultation.fulfilled, (state, { payload }) => {
      if (Object.keys(payload).includes("error")) {
        const { error } = payload as { error: string };
        state.errors = error;
        return;
      }
      if (state.userInfo.roleInfo.type === 'patient') return;
      const { consultations } = state.userInfo.roleInfo;
      const indexOfConsultation = consultations.findIndex(consultation => consultation.id === payload)
      state.userInfo.roleInfo.consultations[indexOfConsultation] = {
        ...state.userInfo.roleInfo.consultations[indexOfConsultation],
        status: 'accepted'
      }
    });

    builder.addCase(rejectConsultation.fulfilled, (state, { payload }) => {
      if (Object.keys(payload).includes("error")) {
        const { error } = payload as { error: string };
        state.errors = error;
        return;
      }
      if (state.userInfo.roleInfo.type === 'patient')
        state.userInfo.roleInfo.consultants = state.userInfo.roleInfo.consultants.filter(c => c.id !== payload);
      if (state.userInfo.roleInfo.type === 'doctor')
        state.userInfo.roleInfo.consultations = state.userInfo.roleInfo.consultations.filter(v => v.id !== payload);
    })

    builder.addCase(bookConsultation.fulfilled, (state, { payload }: PayloadAction<Consultations>) => {
      if (state.userInfo.roleInfo.type === 'patient')
        state.userInfo.roleInfo.consultants = [...state.userInfo.roleInfo.consultants, payload]
      console.log('🚀 ~ file: users.ts ~ line 520 ~ builder.addCase ~ state.userInfo.roleInfo.type', state.userInfo.roleInfo.type)
      console.log('🚀 ~ file: users.ts ~ line 522 ~ builder.addCase ~ payload', payload)
    })
  },
});

export const userReducer = userSlice.reducer;
// export const {} = userSlice.actions;
