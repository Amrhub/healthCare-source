import { Backdrop, Typography } from '@mui/material'
import React from 'react'

import { useAppSelector } from '../redux/configureStore'

const NoDeviceConnected = () => {
  const { hasDeviceConnected } = useAppSelector(state => state.user.userInfo.roleInfo as RolePatientInfo)
  return (
    <Backdrop open={!hasDeviceConnected} sx={{ position: 'absolute', inset: 0, zIndex: '9999999999999999' }}>
      <Typography variant="h4" color="primary.contrastText">
        There is no device connected yet.
      </Typography>
    </Backdrop>
  )
}

export default NoDeviceConnected