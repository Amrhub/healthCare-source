import { Route, Routes } from 'react-router-dom';

import LandingPage from '../pages/Guest/LandingPage';

import { guestRoutes } from './Routes';

const index = () => {
  return (
    <Routes>
      <Route path={guestRoutes.home} element={<LandingPage />} />
    </Routes>
  );
};

export default index;
