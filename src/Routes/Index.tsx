import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Community from '../components/Community/Community';
import Profile from '../components/Profile/Profile';
import Home from '../components/User/Home/Home';
import ReportHistory from '../components/User/ReportHistory/ReportHistory';
import Stories from '../components/Stories/Stories';
import Support from '../components/Support/Support';
import { userRoutes } from './Routes';

const index = () => {
  return (
    <Routes>
      <Route path={userRoutes.home} element={<Home />} />
      <Route path={userRoutes.profile} element={<Profile />} />
      <Route path={userRoutes.reportHistory} element={<ReportHistory />} />
      <Route path={userRoutes.community} element={<Community />} />
      <Route path={userRoutes.stories} element={<Stories />} />
      <Route path={userRoutes.support} element={<Support />} />
    </Routes>
  );
};

export default index;