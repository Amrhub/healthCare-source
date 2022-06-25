import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

import { hideAlert, setAlert } from '../../redux/alert/alertSlice';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();
  const { auth: { isAuthenticated }, loading } = useAppSelector((state) => state.user);
  const location = useLocation();
  useEffect(() => {
    if (isAuthenticated && !(loading === 'pending')) {

      dispatch(hideAlert());
    } else {
      dispatch(setAlert({ message: 'You must be logged in to view this page', type: 'error' }));
    }
  }, [isAuthenticated, dispatch])

  return (
    isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace />
  )
}

export default PrivateRoute