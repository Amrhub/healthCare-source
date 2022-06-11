import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

import { clearAlert, setAlert } from '../../redux/alert/alertSlice';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();
  const { auth: { isAuthenticated }, loading } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated && !(loading === 'pending')) {

      dispatch(clearAlert());
    } else {
      dispatch(setAlert({ message: 'You must be logged in to view this page', type: 'error' }));
    }
  }, [isAuthenticated, dispatch])

  return (
    isAuthenticated ? children : <Navigate to="/" />
  )
}

export default PrivateRoute