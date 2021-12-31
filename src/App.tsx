import { createTheme, ThemeProvider } from '@mui/material/styles';

import AuthLayout from './components/AuthLayout/AuthLayout';
import GuestLayout from './components/GuestLayout/GuestLayout';
import GuestPages from './Routes/GuestRoutes';
import UserAuthPages from './Routes/Index';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4264D0',
      dark: '#2B3C8A',
    },
    secondary: {
      main: '#23B59C',
    },
    grey: {
      100: '#F4F4F8',
      500: '#747B8D',
      900: '#262B32',
    },
  },
  shape: {
    borderRadius: '10px',
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
  const isAuthenticated = true;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {isAuthenticated ? (
          <AuthLayout>
            {' '}
            <UserAuthPages />{' '}
          </AuthLayout>
        ) : (
          <GuestLayout>
            {' '}
            <GuestPages />{' '}
          </GuestLayout>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
