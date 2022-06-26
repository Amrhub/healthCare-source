import { Check } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import FriendCard from '../../components/FriendCard/FriendCard';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore'
import { acceptConsultation, rejectConsultation } from '../../redux/users/users';

const PatientsRequests = () => {
  const { consultations } = useAppSelector(state => state.user.userInfo.roleInfo as RoleDoctorInfo);
  const [pendingConsultations, setPendingConsultations] = useState<Consultations[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPendingConsultations(
      consultations.filter(consultation => consultation.status === "pending")
    )
  }, [consultations])
  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      {
        pendingConsultations.length > 0 ? (
          pendingConsultations.map(({ patientInfo, id }) => (
            <Grid item md={6} key={patientInfo.id}>
              <FriendCard
                userName={patientInfo.name}
                userAvatar={patientInfo.profilePic ?? ''}
                role='patient'
                userId={patientInfo.id}
                IconButtons={
                  [
                    <IconButton children={<Check color="primary" />}
                      key={uuidv4()} onClick={() => dispatch(acceptConsultation(id))} />,
                    <IconButton children={<DeleteOutlinedIcon color="error" />}
                      key={uuidv4()} onClick={() => dispatch(rejectConsultation(id))} />
                  ]
                }
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" color="initial" textAlign="center">
              You have no pending consultations yet
            </Typography>
          </Grid>
        )
      }
    </Grid>
  )
}

export default PatientsRequests