import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Button, Grid, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, styled } from '@mui/system';
import React from 'react';

const LandingPageContainer = styled(Grid)`
  background-image: url('/src/assets/landingPage/right-side-bg.svg');
  background-repeat: no-repeat;
  background-size: 1163px 2000px;
  background-position: 960px 0;
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
  return (
    <LandingPageContainer container sx={{ minHeight: 'calc(200vh - 160px)' }}>
      <LandingPageItem
        item
        xs={6}
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Typography variant="h1" color="primary" sx={{ fontWeight: '700' }}>
          We Provide Total Health Care
        </Typography>
        <Typography variant="body1">
          mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra
          maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare
          arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum
          est ultricies integer quis augue praesent
        </Typography>
      </LandingPageItem>

      <Grid item xs={6} />

      <LandingPageItem item xs={6}>
        <Typography
          variant="h1"
          component="p"
          color="primary"
          sx={{ fontFamily: '"Pacifico", cursive' }}
        >
          Sign in to your account
        </Typography>
        <form>
          <FormContainer>
            <TextField
              label="Email address"
              type={'email'}
              placeholder="example@mail.com"
              sx={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />{' '}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type={'password'}
              placeholder="*************"
              sx={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />{' '}
                  </InputAdornment>
                ),
              }}
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
    </LandingPageContainer>
  );
};

export default LandingPage;
