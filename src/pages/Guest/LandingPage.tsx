import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, styled } from '@mui/system';
import React, { useState } from 'react';


import doctorImageBG from '/src/assets/landingPage/DoctorImage.svg';
import landingPageBG from '/src/assets/landingPage/landing-page-bg.svg';

import { useNavigate } from 'react-router-dom';

import SignUpModal from '../../Modals/SignUpModal';
// import { loginUserSuccess } from '../../redux/users/users';

const LandingPageContainer = styled(Grid)`
  background-image: url(${landingPageBG});
  background-repeat: no-repeat;
  background-position: right top;
`;

const LandingPageItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 530px;
  margin: 4rem auto 0;
  gap: 2.5rem;

  & > * {
    flex-grow: 1;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [signUpModal, setSignUpModal] = useState(false);
  const handleModalOpen = () => setSignUpModal(true);
  const handleModalClose = () => setSignUpModal(false);

  const signInHandler = (event: any): void => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const user = users.find((user: any) => user.email === email);
    if (user?.password === password) {
      // dispatch(loginUserSuccess(user));
      navigate('/user');
    }
  };

  return (
    <LandingPageContainer
      container
      sx={{ minHeight: 'calc(200vh - 160px)', scrollBehavior: 'smooth' }}
    >
      <LandingPageItem
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pl: 3,
          pr: 2,
        }}
      >
        <Typography variant="h1" color="primary" sx={{ fontWeight: '700' }}>
          We Provide Total Health Care
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '24px', color: 'grey.500' }}>
          mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra
          maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare
          arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum
          est ultricies integer quis augue praesent
        </Typography>
      </LandingPageItem>

      <Grid
        item
        xs={6}
        sx={{
          backgroundImage: `url(${doctorImageBG})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      />

      <LandingPageItem item xs={6} id="sign-in-form">
        <Typography
          variant="h2"
          component="p"
          color="primary"
          sx={{ textAlign: 'center' }}
        >
          Sign in to your account
        </Typography>
        <form onSubmit={signInHandler}>
          <FormContainer>
            <TextField
              label="Email address"
              name="email"
              placeholder="example@mail.com"
              sx={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />{' '}
                  </InputAdornment>
                ),
              }}
              required
            />
            <TextField
              type="password"
              label="Password"
              name="password"
              placeholder="*************"
              sx={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />{' '}
                  </InputAdornment>
                ),
              }}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Sign in
            </Button>
            <Button color="inherit" sx={{ textTransform: 'capitalize' }}>
              Forgot password?
            </Button>
          </FormContainer>
        </form>
      </LandingPageItem>

      <LandingPageItem item xs={6} id="sign-up">
        <Box
          sx={{
            maxHeight: { md: '430px' },
            height: { md: '100%' },
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            color: 'white',
          }}
        >
          <Typography variant="h2" component="p" sx={{ textAlign: 'center' }}>
            Hello, Friend!
          </Typography>
          <Box sx={{ maxWidth: { md: '540px' }, marginX: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" component="p">
              Fill up personal information and Improve Your health with us.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ alignSelf: 'center' }}
            onClick={handleModalOpen}
          >
            Sign up
          </Button>
        </Box>
      </LandingPageItem>
      <SignUpModal handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} open={signUpModal} />
    </LandingPageContainer>
  );
};

export default LandingPage;
