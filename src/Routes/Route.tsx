import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Chat from '../pages/Chat/Chat';
import Community from '../pages/Community/Community';
import LandingPage from '../pages/Guest/LandingPage';
import MyPatients from '../pages/MyPatients/MyPatients';
import ProfileCommunityUser from '../pages/Profile/ProfileCommunityUser';
import ProfileMainUser from '../pages/Profile/ProfileMainUser';
import Store from '../pages/Store/Store';
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
      {/* 1- Patients Routes */}
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
      <Route path={userRoutes.profile.community} element={
        <PrivateRoute>
          <ProfileCommunityUser />
        </PrivateRoute>
      } />
      <Route path={userRoutes.reportHistory} element={
        <PrivateRoute>
          <ReportHistory />
        </PrivateRoute>
      } />
      <Route path={userRoutes.chat} element={
        <PrivateRoute>
          <Chat />
        </PrivateRoute>} />
      <Route path={userRoutes.stories.index + '/*'} element={
        <PrivateRoute>
          <Stories />
        </PrivateRoute>
      } />
      <Route
        path={userRoutes.store}
        element={
          <PrivateRoute>
            <Navigate to={`${userRoutes.store}/memberships`} replace />
          </PrivateRoute>
        }
      />
      <Route path={`${userRoutes.store}/:tab`} element={
        <PrivateRoute>
          <Store />
        </PrivateRoute>
      } />
      <Route path={userRoutes.community.index + '/*'} element={
        <PrivateRoute>
          <Community />
        </PrivateRoute>
      } />
      {/* 2- Patients Routes */}
      <Route path={`${userRoutes.myPatients.index}/*`} element={
        <PrivateRoute>
          <MyPatients />
        </PrivateRoute>
      } />

    </Routes>
  );
};

export default index;
