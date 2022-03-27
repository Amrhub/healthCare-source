import { Route, Routes } from 'react-router-dom';

import Community from '../pages/Community/Community';
import LandingPage from '../pages/Guest/LandingPage';
import Membership from '../pages/Membership/Membership';
import Profile from '../pages/Profile/Profile';
import Stories from '../pages/Stories/Stories';
import Home from '../pages/User/Home/Home';
import ReportHistory from '../pages/User/ReportHistory/ReportHistory';

import { guestRoutes, userRoutes } from './Routes';

const index = () => {
  return (
    <Routes>
      <Route path={userRoutes.home} element={<Home />} />
      <Route path={userRoutes.profile} element={<Profile />} />
      <Route path={userRoutes.reportHistory} element={<ReportHistory />} />
      <Route path={userRoutes.community} element={<Community />} />
      <Route path={userRoutes.stories} element={<Stories />} />
      <Route path={userRoutes.membership} element={<Membership />} />
      <Route path={guestRoutes.home} element={<LandingPage />} />
    </Routes>
  );
};

export default index;
