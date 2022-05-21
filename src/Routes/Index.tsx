import { Route, Routes } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Chat from '../pages/Chat/Chat';
import Community from '../pages/Community/Community';
import LandingPage from '../pages/Guest/LandingPage';
import Membership from '../pages/Membership/Membership';
import ProfileCommunityUser from '../pages/Profile/ProfileCommunityUser';
import ProfileMainUser from '../pages/Profile/ProfileMainUser';
import Stories from '../pages/Stories/Stories';
import Home from '../pages/User/Home/Home';
import ReportHistory from '../pages/User/ReportHistory/ReportHistory';

import { guestRoutes, userRoutes } from './Routes';

const index = () => {
  return (
    <Routes>
      {/* Guests Routes */}
      <Route path={guestRoutes.home} element={<LandingPage />} />
      {/* User Routes */}
      <Route path={userRoutes.home} element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path={userRoutes.profile.main} element={
        <PrivateRoute>
          <ProfileMainUser />
        </PrivateRoute>
      } />
      <Route path={userRoutes.profile.community} element={<ProfileCommunityUser />} />
      <Route path={userRoutes.reportHistory} element={<ReportHistory />} />
      <Route path={userRoutes.chat} element={<Chat />} />
      <Route path={userRoutes.stories.index + '/*'} element={<Stories />} />
      <Route path={userRoutes.membership} element={<Membership />} />
      <Route path={userRoutes.community.index + '/*'} element={<Community />} />
      <Route path={guestRoutes.home} element={<LandingPage />} />
    </Routes>
  );
};

export default index;
