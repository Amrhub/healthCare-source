import { Avatar, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import PatientInformationModal from '../../Modals/PatientInformationModal';
import SignUpModal from '../../Modals/SignUpModal';
import { ProfilePropsFriendRequest } from '../../pages/Profile/Profile'
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { acceptFriendship, bookConsultation, cancelFriendship, fetchConsultants, makeFriendship, rejectConsultation, UserGeneralInfo } from '../../redux/users/users';

export type UserInfo = UserGeneralInfo & { roleInfo: PatientInformation };
interface IProps {
  user: UserInfo;
  mainUser: boolean;
  friend: boolean;
  friendRequest: ProfilePropsFriendRequest;
}


const BioProfile = ({
  user,
  mainUser,
  friend,
  friendRequest,
}: IProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { id: userId, role: currentUserRole, referenceId: currentUserReferenceId } = useAppSelector(state => state.user.userInfo)
  const { consultants } = useAppSelector(state => state.user.userInfo.roleInfo as RolePatientInfo);
  const { consultations } = useAppSelector(state => state.user.userInfo.roleInfo as RoleDoctorInfo);
  const pendingFriendship = useAppSelector(state => state.user.friends.pending)
  const acceptedFriendship = useAppSelector(state => state.user.friends.accepted)
  const canRequestConsultation = !mainUser && currentUserRole === "patient" && user.role === "doctor";
  const canSeePatientInfo =
    !mainUser && currentUserRole === "doctor" && user.role === "patient" && consultations.some(c => c.patient_id === parseInt(user.referenceId));
  const [openPatientInfo, setOpenPatientInfo] = useState(false);

  const isConsultationRequestPendingChecker = () => {
    if (!canRequestConsultation) return false;
    return consultants.some(consultant => consultant.doctor_id === parseInt(user.referenceId))
  }

  const isConsultationRequestAcceptedChecker = () => {
    if (!canRequestConsultation) return false;
    return consultants.some(consultant => (consultant.doctor_id === parseInt(user.referenceId) && consultant.status === 'accepted'))
  }

  const [isConsultationRequestPending, setIsConsultationRequestPending] = useState(isConsultationRequestPendingChecker());
  const [isConsultationRequestAccepted, setIsConsultationRequestAccepted] = useState(isConsultationRequestAcceptedChecker());

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    if (currentUserRole === 'patient') {
      dispatch(fetchConsultants(currentUserReferenceId))
    }
  }, [])

  useEffect(() => {
    setIsConsultationRequestAccepted(isConsultationRequestAcceptedChecker());
    setIsConsultationRequestPending(isConsultationRequestPendingChecker());
  }, [consultants])

  const getFriendshipId = ({ userId, user2Id }: { userId: number, user2Id: number }) => {
    return pendingFriendship.find(friendship => (
      friendship.requestee_id === userId && friendship.requester_id === user2Id
      || friendship.requestee_id === user2Id && friendship.requester_id === userId
    )) || acceptedFriendship.find(friendship => (
      friendship.requestee_id === userId && friendship.requester_id === user2Id
      || friendship.requestee_id === user2Id && friendship.requester_id === userId
    ))
  }

  const addFriendHandler = () => {
    dispatch(makeFriendship({ requester_id: userId, requestee_id: user.id }));
  };

  const acceptFriendshipHandler = () => {
    const friendship = getFriendshipId({ userId, user2Id: user.id });

    if (friendship?.id) dispatch(acceptFriendship(friendship.id));
  }

  const cancelConsultationHandler = () => {
    const consultationId = consultants.find(c => c.doctor_id === parseInt(user.referenceId))?.id;
    dispatch(rejectConsultation(consultationId as number));
  }

  const rejectFriendHandler = () => {
    const friendship = getFriendshipId({ userId, user2Id: user.id });

    if (friendship?.id) dispatch(cancelFriendship(friendship.id));
  };

  return (
    <>
      {
        canSeePatientInfo && (
          <PatientInformationModal open={openPatientInfo} handleClose={() => setOpenPatientInfo(false)} user={user} />
        )
      }
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 1,
          borderRadius: '10px',
          width: '446px',
          mt: 5,
          mb: 3,
          ml: 17,
          p: '50px',
          height: '750px',
          backgroundColor: 'white',
        }}
      >
        <Avatar
          alt="profile pic"
          src={user.profilePic}
          sx={{ width: '100px', height: '100px', mt: '20px' }}
        />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 700, mt: '10px' }}>
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ my: '25px' }}>
            {user.bio}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography>Email</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Phone</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user.phone}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Address</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user.address}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Birth date</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user.birthDate} ({user.age})</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Gender</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user.gender}</Typography>
          </Grid>
        </Grid>
        {
          canSeePatientInfo &&
          <Button
            color='info'
            variant="contained"
            sx={{ width: '100%', mt: 'auto' }}
            onClick={() => setOpenPatientInfo(true)}
          >
            Patient Information
          </Button>
        }
        {
          (isConsultationRequestAccepted) ?
            (<Button sx={{ color: 'white', width: '100%', mt: 'auto' }}
              variant='contained'
              color='error'
              onClick={cancelConsultationHandler}
            >Remove Consultant</Button>) :
            (isConsultationRequestPending ?
              (<Button sx={{ color: 'white', width: '100%', mt: 'auto' }}
                variant='contained'
                color='error'
                onClick={cancelConsultationHandler}
              >Cancel Consultation Request</Button>) :
              (
                canRequestConsultation &&
                <Button sx={{ color: 'white', width: '100%', mt: 'auto' }}
                  variant='contained'
                  color='secondary'
                  onClick={() => { dispatch(bookConsultation({ doctor_id: user.referenceId, patient_id: currentUserReferenceId })) }}

                >Request Consultation</Button>
              ))
        }
        {mainUser ? (
          <>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'grey.200',
                color: '#000',
                width: '100%',
                mt: (canRequestConsultation || canSeePatientInfo) ? 1 : 'auto',
                mb: '10px',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                },
              }}
              onClick={handleModalOpen}
            >
              Edit Information
            </Button>
            <SignUpModal
              handleModalClose={handleModalClose}
              open={modalOpen}
              userToEdit={user}
            />
          </>
        ) : friend ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: 'red',
              color: '#fff',
              width: '100%',
              mt: (canRequestConsultation || canSeePatientInfo) ? 1 : 'auto',
              '&:hover': {
                bgcolor: '#940000',
              },
            }}
            onClick={rejectFriendHandler}
          >
            Remove friend
          </Button>
        ) : friendRequest.bool ? (
          friendRequest.requester_id === userId ? (
            <Button
              variant="contained"
              sx={{
                bgcolor: 'red',
                color: '#fff',
                width: '100%',
                mt: (canRequestConsultation || canSeePatientInfo) ? 1 : 'auto',
                '&:hover': {
                  bgcolor: '#940000',
                },
              }}
              onClick={rejectFriendHandler}
            >
              Cancel Request
            </Button>
          ) :
            (<Box sx={{ display: 'flex', gap: '2px', mt: canRequestConsultation ? 1 : 'auto' }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'primary.main',
                  color: '#fff',
                  px: '70px',

                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
                onClick={acceptFriendshipHandler}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'red',
                  color: '#fff',
                  px: '70px',

                  '&:hover': {
                    bgcolor: '#940000',
                  },
                }}
                onClick={rejectFriendHandler}
              >
                Reject
              </Button>
            </Box>)
        ) : (
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              color: '#fff',
              px: '135px',
              mt: (canRequestConsultation || canSeePatientInfo) ? 1 : 'auto',

              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
            onClick={addFriendHandler}
          >
            Add friend
          </Button>
        )}
      </Box>
    </>
  );
};

export default BioProfile;
