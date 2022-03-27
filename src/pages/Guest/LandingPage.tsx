import { PhotoCamera, Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, styled } from '@mui/system';
import React, { useState } from 'react';

import doctorImageBG from '/src/assets/landingPage/DoctorImage.svg';
import landingPageBG from '/src/assets/landingPage/landing-page-bg.svg';
import placeholderPP from '/src/assets/defaultProfilePic.svg';
import signUpModalBG from '/src/assets/signUpModal/sign-up-bg.svg';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { dfCenterCenter } from '../../abstracts/common.styles';
import { loginUserSuccess } from '../../redux/users/users';

interface State {
  password: 'string';
  confirmPassword: 'string';
  passwordVisibility: boolean;
  confirmPasswordVisibility: boolean;
  day: 'string';
  month: 'string';
  year: 'string';
  gender: 'string';
}

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

const ModalContainer = styled(Box)(({ theme }) => ({
  marginX: 'auto',
  textAlign: 'center',
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  paddingBlock: '50px',
  paddingInline: '92px',
  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
  width: '100%',
  maxWidth: '1480px',
}));

const Input = styled('input')({
  display: 'none',
});

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.users);
  const [signUpModal, setSignUpModal] = useState(false);
  const handleModalOpen = () => setSignUpModal(true);
  const handleModalClose = () => setSignUpModal(false);
  const [signUpForm, setSignUpForm] = useState({
    password: '',
    passwordVisibility: false,
    confirmPassword: '',
    confirmPasswordVisibility: false,
    day: '',
    month: '1',
    year: '1998',
    gender: '',
  });
  const signUpFormChangeHandler =
    (key: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newState = {
        ...signUpForm,
        [key]: event.target.value,
      };
      setSignUpForm(newState);
    };

  const signUpSelectChangeHandler = (key: keyof State) => (event: SelectChangeEvent) => {
    const newState = {
      ...signUpForm,
      [key]: event.target.value,
    };
    setSignUpForm(newState);
  };

  const signInHandler = (event: any): void => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const user = users.find((user: any) => user.email === email);
    if (user?.password === password) {
      dispatch(loginUserSuccess(user));
      navigate('/user');
    }
  };

  const passwordVisibilityHandler = (key: keyof State) => {
    setSignUpForm((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
      <Modal
        sx={{
          ...dfCenterCenter,
          background: `url(${signUpModalBG})`,
          backgroundRepeat: 'no-repeat',
        }}
        BackdropProps={{ invisible: true }}
        open={signUpModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <Typography id="modal-modal-title" component="h2" className="sr-only">
            Sign up pop-up window
          </Typography>
          <Typography id="modal-modal-description" className="sr-only">
            Sign up form
          </Typography>

          <form style={{ position: 'relative' }}>
            <label htmlFor="icon-button-file" style={{ position: 'relative' }}>
              <img
                src={placeholderPP}
                alt="person circle icon"
                width={'150'}
                height={'150'}
              />
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                sx={{ position: 'absolute', bottom: '-10px', right: '-10px' }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <Grid container sx={{ mt: 4 }}>
              <Grid container columnSpacing={35.5} rowSpacing={4}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <OutlinedInput
                      id="firstName"
                      label="First Name"
                      placeholder="Amr"
                      type="text"
                      name="firstName"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <OutlinedInput
                      id="lastName"
                      label="Last Name"
                      placeholder="Ahmed"
                      type="text"
                      name="lastName"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
                    <OutlinedInput
                      id="emailAddress"
                      label="Email Address"
                      placeholder="example@mail.com"
                      type="email"
                      name="emailAddress"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="phoneNumber">Phone number</InputLabel>
                    <OutlinedInput
                      id="phoneNumber"
                      label="Phone number"
                      placeholder="+201012345678"
                      type="text"
                      name="phoneNumber"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      label="Password"
                      placeholder="*************"
                      type={signUpForm.passwordVisibility ? 'text' : 'password'}
                      name="password"
                      value={signUpForm.password}
                      onChange={signUpFormChangeHandler('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              passwordVisibilityHandler('passwordVisibility')
                            }
                          >
                            {signUpForm.passwordVisibility ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      label="Confirm Password"
                      placeholder="*************"
                      type={signUpForm.confirmPasswordVisibility ? 'text' : 'password'}
                      name="confirmPassword"
                      value={signUpForm.confirmPassword}
                      onChange={signUpFormChangeHandler('confirmPassword')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              passwordVisibilityHandler('confirmPasswordVisibility')
                            }
                          >
                            {signUpForm.confirmPasswordVisibility ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Nationality"
                    placeholder="Egyptian"
                    name="nationality"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Address"
                    placeholder="Block No.1, Street No.1, 5th Settlement, Cairo"
                    name="Address"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" className="sr-only">
                Birth date
              </Typography>
              <Grid container sx={{ marginBlock: 4 }} columnSpacing={24}>
                <Grid xs item>
                  <FormControl fullWidth>
                    <InputLabel id="Day">Day</InputLabel>
                    <Select
                      labelId="Day"
                      name="day"
                      fullWidth
                      label="Day"
                      value={signUpForm.day}
                      onChange={signUpSelectChangeHandler('day')}
                      sx={{ textAlign: 'left' }}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs item>
                  <FormControl fullWidth>
                    <InputLabel id="Month">Month</InputLabel>
                    <Select
                      labelId="Month"
                      name="month"
                      fullWidth
                      label="Month"
                      value={signUpForm.month}
                      onChange={signUpSelectChangeHandler('day')}
                      sx={{ textAlign: 'left' }}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs item>
                  <FormControl fullWidth>
                    <InputLabel id="Year">Year</InputLabel>
                    <Select
                      labelId="Year"
                      name="year"
                      fullWidth
                      label="Year"
                      value={signUpForm.year}
                      onChange={signUpSelectChangeHandler('day')}
                      sx={{ textAlign: 'left' }}
                    >
                      <MenuItem value="1997">1997</MenuItem>
                      <MenuItem value="1998">1998</MenuItem>
                      <MenuItem value="1999">1999</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item sx={{ width: '365px' }}>
                <FormControl component="fieldset" sx={{ flexDirection: 'row' }}>
                  <FormLabel component="p" sx={{ mr: 8 }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={signUpForm.gender}
                    onChange={signUpFormChangeHandler('gender')}
                    row
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      sx={{ mr: 8 }}
                    />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 4 }}>
              Sign Up
            </Button>
            <IconButton
              aria-label="close"
              onClick={handleModalClose}
              sx={{ position: 'absolute', top: '0', right: '0', color: 'grey.900' }}
            >
              <CloseIcon />
            </IconButton>
          </form>
        </ModalContainer>
      </Modal>
    </LandingPageContainer>
  );
};

export default LandingPage;
