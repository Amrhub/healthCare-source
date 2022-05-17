import { ChevronLeft, ChevronRight, PhotoCamera, Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { Box, styled } from '@mui/system';

import placeholderPP from '/src/assets/defaultProfilePic.svg';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react'

import { dfCenterCenter, dfUnsetCenter } from '../abstracts/common.styles'
import { DATEFORMAT, formatDate } from '../utils/helpers/helpers';

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
  position: 'relative'
}));

interface IProps {
  handleModalOpen: () => void;
  handleModalClose: () => void;
  open: boolean;
}


const SignUpModal = ({
  handleModalOpen,
  handleModalClose,
  open
}: IProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  // users fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('1988-01-01');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  // patients fields
  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [smoker, setSmoker] = useState('');
  const [covid, setCovid] = useState(false);
  const [hyperTension, setHyperTension] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [otherDiseases, setOtherDiseases] = useState(false);
  const [otherDiseasesDetails, setOtherDiseasesDetails] = useState('');
  // doctors fields
  const [specialization, setSpecialization] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState<number>();
  const [expectedSalary, setExpectedSalary] = useState<number>();


  const FirstStep = () => (
    <>
      <label htmlFor="icon-button-file" style={{ position: 'relative' }}>
        <img
          src={placeholderPP}
          alt="person circle icon"
          width={'150'}
          height={'150'}
        />
        <ProfilePictureInput accept="image/*" id="icon-button-file" type="file" />
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
                type={passwordVisibility ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setPasswordVisibility((prev) => !prev)
                      }
                    >
                      {passwordVisibility ? (
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
                type={passwordVisibility ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setPasswordVisibility((prev) => !prev)
                      }
                    >
                      {passwordVisibility ? (
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disableFuture
                  label="Date of Birth"
                  openTo="day"
                  views={['year', 'month', 'day']}
                  value={birthDate}
                  onChange={(e: Date | null) => setBirthDate(formatDate(e))}
                  inputFormat={DATEFORMAT}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Address"
              placeholder="Block No.1, Street No.1, 5th Settlement, Cairo"
              name="Address"
              fullWidth
            />
          </Grid>

          <Grid item xs={6} sx={{ display: 'flex' }}>
            <FormControl component="fieldset" sx={{ flexDirection: 'row' }}>
              <FormLabel component="p" sx={{ mr: 8 }}>
                Gender
              </FormLabel>
              <RadioGroup
                aria-label="role"
                name="controlled-radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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

          <Grid item sx={{ display: 'flex' }} xs={6}>
            <FormControl component="fieldset" sx={{ flexDirection: 'row' }}>
              <FormLabel component="p" sx={{ mr: 8 }}>
                Role
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                row
              >
                <FormControlLabel
                  value="patient"
                  control={<Radio />}
                  label="Patient"
                  sx={{ mr: 8 }}
                />
                <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );


  const SecondStep = () => (
    <>
      <Grid container sx={{ mt: 6 }}>
        <Grid container columnSpacing={35.5} rowSpacing={4}>
          <Grid item xs={12}>
            <TextField
              label='Bio (optional)'
              placeholder='Tell us more about you!'
              name='bio'
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          {
            role === 'patient' ? (
              <>
                <Grid item xs={6}>
                  <TextField
                    id="weight"
                    label="Weight"
                    value={weight}
                    placeholder="Weight (kg)"
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="height"
                    label="Height"
                    value={height}
                    placeholder="Height (cm)"
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex' }}>
                  <FormControl component="fieldset" sx={{ flexDirection: 'row' }}>
                    <FormLabel component="p" sx={{ mr: 8 }}>
                      Do you smoke?
                    </FormLabel>
                    <RadioGroup aria-label="are you smoking?" name="smoking" value={smoker} onChange={(e) => setSmoker(e.target.value)} row>
                      <FormControlLabel value='yes' control={<Radio />} label="Yes" sx={{ mr: 8 }} />
                      <FormControlLabel value='no' control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ ...dfUnsetCenter, gap: 9.25 }}>
                  <Typography variant="body1">
                    Do you suffer from any of these diseases?
                  </Typography>
                  <Stack direction="row" columnGap={12.5}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={diabetes}
                          onChange={(e) => setDiabetes(e.target.checked)}
                          name="diabetes"
                        />
                      }
                      label="Diabetes"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={hyperTension}
                          onChange={(e) => setHyperTension(e.target.checked)}
                          name="Hypertension"
                        />
                      }
                      label="Hypertension"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={covid}
                          onChange={(e) => setCovid(e.target.checked)}
                          name="covid"
                        />
                      }
                      label="Covid"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={otherDiseases}
                          onChange={(e) => setOtherDiseases(e.target.checked)}
                          name="otherDiseases"
                        />
                      }
                      label="Other"
                    />
                  </Stack>

                </Grid>

                {otherDiseases && (
                  <Grid item xs={12}>
                    <TextField
                      id="otherDiseases"
                      label="Other Diseases"
                      value={otherDiseasesDetails}
                      placeholder="Please provide details for our doctors"
                      onChange={(e) => setOtherDiseasesDetails(e.target.value)}
                      fullWidth
                      multiline
                      rows={2}
                    />
                  </Grid>
                )}
              </>
            ) :
              (
                <>
                  <Grid item xs={6} sx={{ mr: 1 }}>
                    <TextField
                      id="specialization"
                      label="Specialization"
                      value={specialization}
                      placeholder="Specialization"
                      onChange={(e) => setSpecialization(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      id="experience"
                      label="Years of Experience"
                      value={yearsOfExperience}
                      placeholder="2"
                      onChange={(e) => setYearsOfExperience(parseFloat(e.target.value))}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      id="salary"
                      label="Expected salary"
                      value={expectedSalary}
                      placeholder="$100,000"
                      onChange={(e) => setExpectedSalary(parseFloat(e.target.value))}
                      fullWidth
                    />
                  </Grid>
                </>
              )
          }
        </Grid>
      </Grid>
    </>
  )

  const ProfilePictureInput = styled('input')({
    display: 'none',
  });
  return (
    <Modal
      sx={{
        ...dfCenterCenter,
        backgroundColor: 'grey.100',
        backgroundRepeat: 'no-repeat',
      }}
      BackdropProps={{ invisible: true }}
      open={open}
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
          {
            isFirstStep ? <FirstStep /> : <SecondStep />
          }

          <Box sx={{ mt: 4, display: 'flex', justifyContent: isFirstStep ? 'center' : 'space-between' }}>
            {isFirstStep ? (
              <Button size='large' endIcon={<ChevronRight />}
                onClick={() => setIsFirstStep(false)}
              >Next</Button>
            ) :
              (
                <>
                  <Button size='large' startIcon={<ChevronLeft />}
                    onClick={() => setIsFirstStep(true)}
                  >Back</Button>


                  <Button type="submit" variant="contained" sx={{ px: 5 }}>
                    Sign Up
                  </Button>
                </>
              )}
          </Box>
        </form>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{ position: 'absolute', top: '40px', right: '90px', color: 'grey.900' }}
        >
          <CloseIcon />
        </IconButton>
      </ModalContainer>
    </Modal >
  )
}

export default SignUpModal