import { Avatar, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

import SignUpModal from '../../Modals/SignUpModal';


const BioProfile = ({
  user,
  mainUser,
  friend,
  friendRequest,
}: any) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
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
        {mainUser ? (
          <>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'grey.200',
                color: '#000',
                width: '100%',
                mt: 'auto',
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
              mt: 'auto',
              mb: '10px',

              '&:hover': {
                bgcolor: '#940000',
              },
            }}
          >
            Remove friend
          </Button>
        ) : friendRequest ? (
          <Box sx={{ display: 'flex', gap: '2px', mt: 'auto', mb: '10px' }}>
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
            >
              Reject
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              color: '#fff',
              px: '135px',
              mt: 'auto',

              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Add friend
          </Button>
        )}
      </Box>
    </>
  );
};

export default BioProfile;
