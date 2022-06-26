import { Divider } from '@mui/material'
import { useLocation } from 'react-router-dom'

import ContainerBox from '../../layouts/ContainerBox/ContainerBox'
import ContainerBoxNav, { ContainerBoxNavLink } from '../../layouts/ContainerBox/ContainerBoxNav'
import { userRoutes } from '../../Routes/Routes'

import MyPatientsRenderer from './MyPatientsRenderer'
import PatientsRequests from './PatientsRequests'

const MyPatients = () => {
  const { pathname } = useLocation();

  const renderCommunityPages = () => {
    if (pathname === userRoutes.myPatients.index) return <MyPatientsRenderer />
    if (pathname === userRoutes.myPatients.request) return <PatientsRequests />
  }
  return (
    <ContainerBox>
      <ContainerBoxNav>
        <ContainerBoxNavLink to={userRoutes.myPatients.index} end>
          My Patients
        </ContainerBoxNavLink>
        <ContainerBoxNavLink to={userRoutes.myPatients.request}>
          Patient Requests
        </ContainerBoxNavLink>
      </ContainerBoxNav>
      <Divider
        sx={{
          bgcolor: 'grey.900',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          mb: 3,
        }}
      />
      {renderCommunityPages()}
    </ContainerBox>
  )
}

export default MyPatients