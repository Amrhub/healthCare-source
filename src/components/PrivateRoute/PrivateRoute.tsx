import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

import { clearAlert, setAlert } from '../../redux/alert/alertSlice';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user.auth);
  console.log("Hey I'm in PrivateRoute");

  useEffect(() => {
    if (isAuthenticated) {
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