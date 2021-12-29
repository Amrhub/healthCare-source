import { createTheme, ThemeProvider } from '@mui/material/styles';

import AuthLayout from './components/AuthLayout/AuthLayout';
import Pages from './Routes/Index';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4264D0',
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
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AuthLayout>
          <Pages />
        </AuthLayout>
      </div>
    </ThemeProvider>
  );
};

export default App;
