import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, styled } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import landingPageBG from '/src/assets/landingPage/Card.svg';

import landingPageTopBG from '../../assets/landingPage/landing-page-image.png';
import CarouselSpecialties from '../../components/CarouselSpecialties/CarouselSpecialties';
import PaymentPlans from '../../components/PaymentPlans/PaymentPlans';
import SignUpModal from '../../Modals/SignUpModal';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { login } from '../../redux/users/users';
import { userRoutes } from '../../Routes/Routes';
import { plans } from '../Store/Memberships';

const LandingPageTop = styled(Box)`
  background-image: url(${landingPageTopBG});
  background-repeat: no-repeat;
`;

const LandingPagePlans = styled(Box)`
  background-color: #e5e5e5;
`;

const PlansContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 90px;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const LandingPageCateg = styled(Box)`
  background-color: #fff;
  height: 500px;
  margin-left: 288px;
  margin-right: 288px;
`;

const LandingPageFormContainer = styled(Stack)`
  height: 1000px;
  background-color: #e5e5e5;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
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
  const [signUpModal, setSignUpModal] = useState(false);
  const handleModalOpen = () => setSignUpModal(true);
  const handleModalClose = () => setSignUpModal(false);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth: { isAuthenticated }, loading } = useAppSelector((state) => state.user);
  const location = useLocation();
  const locationState = location?.state as any;
  const from = locationState ? locationState?.from : userRoutes.home;


  const navigate = useNavigate();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const signInHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated && !(loading === 'pending')) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading]);


  return (
    <>
      <LandingPageTop sx={{ minHeight: '802.5px', scrollBehavior: 'smooth' }}>
        <LandingPageItem
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            ml: '150px',
            mt: '212px',
            width: '818px',
          }}
        >
          <Typography variant="h1" color="primary" sx={{ fontWeight: '700' }}>
            We Provide <br /> Total Health Care
          </Typography>
          <Typography variant="body1" sx={{ mt: '35px', color: 'grey.500' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin sed
            commodo tincidunt eget eu. Aliquam rhoncus sodales sed aenean pellentesque sit
            turpis magna quis. Imperdiet leo blandit hac pretium id enim, gravida. Quam
            est dolor, egestas vitae dolor congue. Sodales aliquam pulvinar in odio
            gravida. Volutpat, fermentum aliquam pharetra, augue nullam aliquet vitae
            accumsan. Tristique est risus lacinia consequat. Id id aliquet lacus, vitae.
            Feugiat tortor lacus, feugiat feugiat vehicula ipsum dolor est gravida.
            Rhoncus nibh integer aliquet orci scelerisque. Varius ullamcorper aliquet
            consequat orci, at.
          </Typography>
        </LandingPageItem>
      </LandingPageTop>

      <LandingPagePlans
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          color={'primary.main'}
          sx={{ fontWeight: '700', fontSize: '36px', mt: '99.5px' }}
        >
          Choose from
        </Typography>
        <Typography
          color={'text.primary'}
          sx={{ fontWeight: '700', fontSize: '64px', lineHeight: '75px', mt: '16px' }}
        >
          Our Best Pricing Plan
        </Typography>
        <Typography
          color={'text.primary'}
          variant="body1"
          sx={{
            fontWeight: '400',
            width: '703px',
            lineHeight: '18.75px',
            textAlign: 'center',
            mt: '16px',
          }}
        >
          It is available to teenagers, Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Odio viverra eu mi fermentum amet, faucibus purus. Ac, lectus hac et
          phasellus commodo nunc eget.
        </Typography>
        <PlansContainer container spacing={3}>
          {plans.map(({ cost, type, features, contained }) => (
            <PaymentPlans
              cost={cost}
              type={type}
              features={features}
              contained={contained}
              key={uuidv4()}
            />
          ))}
        </PlansContainer>
      </LandingPagePlans>

      <LandingPageCateg>
        <Typography sx={{ fontWeight: '700', fontSize: '40px', mt: '36px' }}>
          Book from top specialties
        </Typography>
        <CarouselSpecialties />
      </LandingPageCateg>

      <LandingPageFormContainer>
        <LandingPageItem
          item
          id="sign-in-form"
          bgcolor={'#fff'}
          height={'800px'}
          ml={'287px'}
          width={'100%'}
          sx={{ borderRadius: '10px' }}
        >
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@mail.com"
                sx={{ width: '100%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="*************"
                sx={{ width: '100%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
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
        <LandingPageItem
          item
          id="sign-up"
          height={'800px'}
          mr={'287px'}
          width={'100%'}
          sx={{ backgroundImage: `url(${landingPageBG})`, borderRadius: '10px' }}
        >
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
        <SignUpModal
          handleModalClose={handleModalClose}
          open={signUpModal}
        />
      </LandingPageFormContainer>
    </>
  );
};

export default LandingPage;
