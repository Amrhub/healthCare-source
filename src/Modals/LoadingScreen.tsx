import { Modal, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingScreen = () => {
  return (
    <Modal open={true}>
      <CircularProgress />
    </Modal>
  )
}

export default LoadingScreen