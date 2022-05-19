import { createTheme, ThemeProvider } from '@mui/material/styles';

import { DisplayAlert } from './components/Alert/DisplayAlert';
import AuthLayout from './components/AuthLayout/AuthLayout';
import GuestLayout from './components/GuestLayout/GuestLayout';
import { useAppSelector } from './redux/configureStore';
import GuestPages from './Routes/GuestRoutes';
import UserAuthPages from './Routes/Index';

const theme = createTheme({
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
  const { isAuthenticated } = useAppSelector(state => state.user.auth)

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {isAuthenticated ? (
          <AuthLayout>
            <DisplayAlert />
            <UserAuthPages />
          </AuthLayout>
        ) : (
          <GuestLayout>
            <DisplayAlert />
            <GuestPages />
          </GuestLayout>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
