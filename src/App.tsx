import React from 'react';
import AuthLayout from './components/AuthLayout/AuthLayout';
import Pages from './Routes/Index';

const App = () => {
  return (
    <div className="App">
      <AuthLayout>
        <Pages />
      </AuthLayout>
    </div>
  );
};

export default App;
