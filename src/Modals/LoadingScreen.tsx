import { CircularProgress, Backdrop } from '@mui/material'

const LoadingScreen = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: '99999999' }}>
      <CircularProgress />
    </Backdrop>
  )
}

export default LoadingScreen