const LOGIN_USER_SUCCESS = 'HEALTHCARE_USERS_LOGIN_USER_SUCCESS';
const LOGOUT_USER = 'HEALTHCARE_USERS_LOGOUT_USER';

const initialState = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'testjohn@test.com',
      password: 'test',
      avatar: 'https://i.pravatar.cc/300?img=2',
      role: 'patient',
      createdAt: '2019-01-01',
      updatedAt: '2019-01-01',
    },
    {
      id: 2,
      name: 'Alice Jackson',
      avatar: 'https://i.pravatar.cc/300?img=3',
      email: 'testalice@test.com',
      password: 'test',
      role: 'patient',
      createdAt: '2019-01-01',
      updatedAt: '2019-01-01',
    },
    {
      id: 3,
      name: 'Jon Doe',
      avatar: 'https://i.pravatar.cc/300?img=4',
      email: 'testjon@test.com',
      password: 'test',
      role: 'patient',
      createdAt: '2019-01-01',
      updatedAt: '2019-01-01',
    },
  ],
  authUser: false,
  authUserInfo: {},
};

export const loginUserSuccess = (payload: any) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

const reducer = (
  state = initialState,
  { type, payload }: { type: any; payload: any },
) => {
  switch (type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        authUser: true,
        authUserInfo: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        authUser: false,
        authUserInfo: {},
      };
    default:
      return state;
  }
};

export default reducer;
