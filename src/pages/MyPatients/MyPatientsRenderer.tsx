import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react';

import FriendCard from '../../components/FriendCard/FriendCard';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { rejectConsultation } from '../../redux/users/users';

const MyPatientsRenderer = () => {
  const { consultations } = useAppSelector(state => state.user.userInfo.roleInfo as RoleDoctorInfo);
  const [myPatients, setMyPatients] = useState<Consultations[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!consultations) return;
    setMyPatients(
      consultations.filter(consultation => consultation.status === "accepted")
    )
  }, [consultations])
  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      {
        myPatients.length > 0 ? (
          myPatients.map(({ patientInfo, id }) => (
            <Grid item md={6} key={patientInfo.id}>
              <FriendCard
                userName={patientInfo.name}
                userAvatar={patientInfo.profilePic ?? ''}
                role='patient'
                userId={patientInfo.id}
                IconButtons={[<IconButton children={<PersonRemoveIcon color="error" />} key={id}
                  onClick={() => { dispatch(rejectConsultation(id)) }} />]}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" color="initial" textAlign="center">
              You have no patients under consultations yet, Maybe check patient requests
            </Typography>
          </Grid>
        )
      }
    </Grid>
  )
}

export default MyPatientsRenderer