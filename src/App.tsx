import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';

import { DisplayAlert } from './components/Alert/DisplayAlert';
import AuthLayout from './components/AuthLayout/AuthLayout';
import GuestLayout from './components/GuestLayout/GuestLayout';
import LoadingScreen from './Modals/LoadingScreen';
import { useAppDispatch, useAppSelector } from './redux/configureStore';
import { fetchStories } from './redux/stories/storySlice';
import { getPostsUserLike, userFromToken } from './redux/users/users';
import Routes from './Routes/Route';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4264D0',
      dark: '#2c4baf',
    },
    secondary: {
      main: '#23B59C',
    },
    grey: {
      100: '#F4F4F8',
      500: '#747B8D',
      900: '#262B32',
    },
    success: {
      main: '#44b700',
    },
    info: {
      main: '#919191',
    },
    text: {
      primary: '#262B32',
    },
  },
  shape: {
    borderRadius: 10,
  },

  typography: {
    h1: {
      fontWeight: '700',
      fontSize: '6rem',
    },
    h2: {
      fontWeight: '400',
      fontSize: '4rem',
      fontFamily: '"Pacifico", cursive',
    },
    h3: {
      fontWeight: '400',
      fontSize: '3rem',
    },
    h4: {
      fontWeight: '400',
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'capitalize',
    },
  },
});

const App = () => {
  const { userInfo, auth, loading } = useAppSelector(state => state.user);

  const userId = userInfo?.id;
  const { isAuthenticated } = auth;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    if (token && !isAuthenticated) {
      dispatch(userFromToken(token));
    } else {
      dispatch(getPostsUserLike(userId));
    }
  }, [dispatch, localStorage, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchStories());
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {loading === "pending" && (
          <LoadingScreen />
        )}
        {isAuthenticated ? (
          <AuthLayout>
            <DisplayAlert />
            <Routes />
          </AuthLayout>
        ) : (
          <GuestLayout>
            <DisplayAlert />
            <Routes />
          </GuestLayout>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
