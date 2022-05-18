/* eslint-disable unicorn/consistent-function-scoping */
import { ChevronLeft, ChevronRight, PhotoCamera, Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Modal, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Box, styled } from '@mui/system';

import placeholderPP from '/src/assets/defaultProfilePic.svg';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";

import { dfCenterCenter, dfUnsetCenter } from '../abstracts/common.styles';
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

const UploaderContainer = styled(Stack)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  width: '50%',
  paddingBlock: theme.spacing(4),
  alignItems: 'center'
}));

const ImageListPreviewContainer = styled(Box)`
  width: 50%;
`

interface IProps {
  handleModalOpen: () => void;
  handleModalClose: () => void;
  open: boolean;
}

const SignUpModal = ({
  handleModalClose,
  open
}: IProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  /* 
    TODO: Validate the form by using the following method >>
    TODO: each state is object with value, error, and errorMessage
    TODO: const firstName = { value: '', error: false, errorMessage: '' }
  */
  // users fields
  const [firstName, setFirstName] = useState({ value: '', error: false, errorMessage: '' });
  const [lastName, setLastName] = useState({ value: '', error: false, errorMessage: '' });
  const [email, setEmail] = useState({ value: '', error: false, errorMessage: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: false, errorMessage: '' });
  const [password, setPassword] = useState({ value: '', error: false, errorMessage: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: false, errorMessage: '' });
  const [birthDate, setBirthDate] = useState({ value: '', error: false, errorMessage: '' });
  const [address, setAddress] = useState({ value: '', error: false, errorMessage: '' });
  const [gender, setGender] = useState('female');
  const [role, setRole] = useState('patient');
  const [bio, setBio] = useState('');
  // patients fields
  const [weight, setWeight] = useState({ value: 0, error: false, errorMessage: '' });
  const [height, setHeight] = useState({ value: 0, error: false, errorMessage: '' });
  const [smoker, setSmoker] = useState('no');
  const [covid, setCovid] = useState(false);
  const [hyperTension, setHyperTension] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [otherDiseases, setOtherDiseases] = useState(false);
  const [otherDiseasesDetails, setOtherDiseasesDetails] = useState({ value: '', error: false, errorMessage: '' });
  // doctors fields
  const [specialization, setSpecialization] = useState({ value: '', error: false, errorMessage: '' });
  const [yearsOfExperience, setYearsOfExperience] = useState({ value: 0, error: false, errorMessage: '' });
  const [expectedSalary, setExpectedSalary] = useState({ value: 0, error: false, errorMessage: '' });
  const [certificates, setCertificates] = useState([]);
  const maxNumber = 5;


  const handleCertificatesChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setCertificates(imageList as never[]);
  };

  const ProfilePictureInput = styled('input')({
    display: 'none',
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) // TODO: call the api and return 
    { console.log("submit"); }
    else {
      console.log("invalid");
    }

    // return
  };

  const isFormValid = () => {
    let isValid = true;
    // First step validation
    if (!firstName.value) {
      setFirstName(prev => ({ ...prev, error: true, errorMessage: 'First name is required' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (/^[A-Za-z]+$/.test(firstName.value) === false) {
      setFirstName(prev => ({ ...prev, error: true, errorMessage: 'First name can ONLY contain letters' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (firstName.value.length < 3) {
      setFirstName(prev => ({ ...prev, error: true, errorMessage: 'First name must be at least 3 characters long' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (firstName.value.length > 20) {
      setFirstName(prev => ({ ...prev, error: true, errorMessage: 'First name must be less than 20 characters long' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else {
      setFirstName(prev => ({ ...prev, error: false, errorMessage: '' }));
    }
    if (!lastName.value) {
      setLastName(prev => ({ ...prev, error: true, errorMessage: 'Last name is required' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (/^[A-Za-z]+$/.test(lastName.value) === false) {
      setLastName(prev => ({ ...prev, error: true, errorMessage: 'Last name can ONLY contain letters' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (lastName.value.length < 3) {
      setLastName(prev => ({ ...prev, error: true, errorMessage: 'Last name must be at least 3 characters long' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (lastName.value.length > 20) {
      setLastName(prev => ({ ...prev, error: true, errorMessage: 'Last name must be less than 20 characters long' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else {
      setLastName(prev => ({ ...prev, error: false, errorMessage: '' }));
    }

    if (!email.value) {
      setEmail(prev => ({ ...prev, error: true, errorMessage: 'Email is required' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (/^[\dA-Za-z]+@[\dA-Za-z]+\.[\dA-Za-z]+$/.test(email.value) === false) {
      setEmail(prev => ({ ...prev, error: true, errorMessage: 'Email is invalid' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else {
      setEmail(prev => ({ ...prev, error: false, errorMessage: '' }));
    }

    if (!phoneNumber.value) {
      setPhoneNumber(prev => ({ ...prev, error: true, errorMessage: 'Phone number is required' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } if (/^\+[1-9]\d{3,14}$/.test(phoneNumber.value) === false) {
      setPhoneNumber(prev => ({ ...prev, error: true, errorMessage: 'Phone number can ONLY contain numbers and country code' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else {
      setPhoneNumber(prev => ({ ...prev, error: false, errorMessage: '' }));
    }

    if (!password.value) {
      setPassword(prev => ({ ...prev, error: true, errorMessage: 'Password is required' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (password.value.length < 6) {
      setPassword(prev => ({ ...prev, error: true, errorMessage: 'Password must be at least 6 characters long' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else {
      setPassword(prev => ({ ...prev, error: false, errorMessage: '' }));
    }

    if (confirmPassword.value !== password.value) {
      setConfirmPassword(prev => ({ ...prev, error: true, errorMessage: 'Passwords do not match' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else {
      setConfirmPassword(prev => ({ ...prev, error: false, errorMessage: '' }));
    }

    if (!address.value) {
      setAddress(prev => ({ ...prev, error: true, errorMessage: 'Address is required' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else {
      setAddress(prev => ({ ...prev, error: false, errorMessage: '' }));
    }

    if (!birthDate.value) {
      setBirthDate(prev => ({ ...prev, error: true, errorMessage: 'Birth date is required' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else if (/^\d{4}(?:\/\d{2}){2}$/.test(birthDate.value) === false) {
      setBirthDate(prev => ({ ...prev, error: true, errorMessage: 'Birth date should follow this format yyyy/mm/dd' }));
      isValid = false;
      !isFirstStep && setIsFirstStep(true)
    } else {
      setBirthDate(prev => ({ ...prev, error: false, errorMessage: '' }));
    }

    // Second step validation
    if (role === 'patient') {
      // patient validation
      if (!weight.value) {
        setWeight(prev => ({ ...prev, error: true, errorMessage: 'Weight is required' }));
        isValid = false;
      } else if (weight.value <= 0) {
        setWeight(prev => ({ ...prev, error: true, errorMessage: 'Weight must be greater than 0' }));
        isValid = false;
      } else {
        setWeight(prev => ({ ...prev, error: false, errorMessage: '' }));
      }

      if (!height.value) {
        setHeight(prev => ({ ...prev, error: true, errorMessage: 'Height is required' }));
        isValid = false;
      } else if (height.value <= 0) {
        setHeight(prev => ({ ...prev, error: true, errorMessage: 'Height must be greater than 0' }));
        isValid = false;
      } else {
        setHeight(prev => ({ ...prev, error: false, errorMessage: '' }));
      }

      if (otherDiseases && otherDiseasesDetails.value) {
        setOtherDiseasesDetails(prev => ({ ...prev, error: true, errorMessage: 'Other diseases details is required' }));
        isValid = false;
      } else {
        setOtherDiseasesDetails(prev => ({ ...prev, error: false, errorMessage: '' }));
      }
    }

    // doctor validation
    if (role === 'doctor') {
      if (!specialization.value) {
        setSpecialization(prev => ({ ...prev, error: true, errorMessage: 'Specialization is required' }));
        isValid = false;
      } else if (specialization.value.length < 3) {
        setSpecialization(prev => ({ ...prev, error: true, errorMessage: 'Specialization must be at least 3 characters long' }));
        isValid = false;
      } else {
        setSpecialization(prev => ({ ...prev, error: false, errorMessage: '' }));
      }

      if (!yearsOfExperience.value) {
        setYearsOfExperience(prev => ({ ...prev, error: true, errorMessage: 'Years of experience is required' }));
        isValid = false;
      } else if (yearsOfExperience.value < 0) {
        setYearsOfExperience(prev => ({ ...prev, error: true, errorMessage: 'Years of experience must be greater than 0' }));
        isValid = false;
      } else {
        setYearsOfExperience(prev => ({ ...prev, error: false, errorMessage: '' }));
      }

      if (!expectedSalary.value) {
        setExpectedSalary(prev => ({ ...prev, error: true, errorMessage: 'Expected salary is required' }));
        isValid = false;
      } else if (expectedSalary.value < 0) {
        setExpectedSalary(prev => ({ ...prev, error: true, errorMessage: 'Expected salary must be greater than 0' }));
        isValid = false;
      } else {
        setExpectedSalary(prev => ({ ...prev, error: false, errorMessage: '' }));
      }
    }
    return isValid;
  }

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

        <form onSubmit={submitHandler}>
          {
            isFirstStep ? (
              // <FirstStep/>
              // ! This to be refactored to a separate component for simplicity the issue was when we type something in a field it's laggy and keeps losing focus
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
                  <Grid container rowSpacing={4}>
                    <Grid item container columnGap={35.5} rowSpacing={4} wrap="nowrap">
                      <Grid item xs={6}>
                        <TextField
                          id="firstName"
                          label="First Name"
                          placeholder='Joe'
                          variant="outlined"
                          value={firstName.value}
                          onChange={(e) => setFirstName((prev) => ({ ...prev, value: e.target.value }))}
                          error={firstName.error}
                          helperText={firstName.error ? firstName.errorMessage : ''}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="lastName"
                          label="Last Name"
                          placeholder='Doe'
                          variant="outlined"
                          value={lastName.value}
                          onChange={(e) => setLastName((prev) => ({ ...prev, value: e.target.value }))}
                          error={lastName.error}
                          helperText={lastName.error ? lastName.errorMessage : ''}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>

                    <Grid item container columnGap={35.5} rowSpacing={4} wrap="nowrap">
                      <Grid item xs={6}>
                        <TextField
                          label="Email"
                          placeholder='example@email.com'
                          variant="outlined"
                          value={email.value}
                          onChange={(e) => setEmail((prev) => ({ ...prev, value: e.target.value }))}
                          error={email.error}
                          helperText={email.error ? email.errorMessage : ''}
                          fullWidth
                          required
                          autoComplete='email'
                          inputProps={{
                            type: 'email',
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="phoneNumber"
                          label="Phone Number"
                          placeholder='+2 (123) 456-7890'
                          variant="outlined"
                          value={phoneNumber.value}
                          onChange={(e) => setPhoneNumber((prev) => ({ ...prev, value: e.target.value }))}
                          error={phoneNumber.error}
                          helperText={phoneNumber.error ? phoneNumber.errorMessage : ''}
                          fullWidth
                          required
                          autoComplete='tel-country-code phone mobile'
                        />
                      </Grid>
                    </Grid>

                    <Grid item container columnGap={35.5} rowSpacing={4} wrap="nowrap">
                      <Grid item xs={6}>
                        <TextField
                          id="password"
                          label="Password"
                          placeholder='********'
                          variant="outlined"
                          value={password.value}
                          onChange={(e) => setPassword((prev) => ({ ...prev, value: e.target.value }))}
                          error={password.error}
                          helperText={password.error ? password.errorMessage : 'Password should be at least 6 characters long'}
                          fullWidth
                          type={passwordVisibility ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">
                              <IconButton onClick={() => setPasswordVisibility((prev) => !prev)}>
                                {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>,
                          }}
                          required
                          autoComplete='new-password'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="passwordConfirmation"
                          label="Confirm Password"
                          placeholder='********'
                          variant="outlined"
                          value={confirmPassword.value}
                          type={passwordVisibility ? 'text' : 'password'}
                          onChange={(e) => setConfirmPassword((prev) => ({ ...prev, value: e.target.value }))}
                          error={confirmPassword.error}
                          helperText={confirmPassword.error ? confirmPassword.errorMessage : ''}
                          fullWidth
                          InputProps={{
                            endAdornment: <InputAdornment position="end">
                              <IconButton onClick={() => setPasswordVisibility((prev) => !prev)}>
                                {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>,
                          }}
                          required
                          autoComplete='new-password'
                        />
                      </Grid>
                    </Grid>

                    <Grid item container columnGap={35.5} rowSpacing={4} wrap="nowrap">
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              disableFuture
                              label="Date of Birth"
                              openTo="day"
                              views={['day', 'month', 'year']}
                              value={birthDate.value}
                              onChange={(e: Date | null) => setBirthDate(prev => ({ ...prev, value: formatDate(e) }))}
                              inputFormat={DATEFORMAT}
                              mask="____/__/__"
                              renderInput={(params: any) =>
                                <TextField {...params} error={birthDate.error}
                                  helperText={birthDate.error ? birthDate.errorMessage : ''}
                                  onChange={(e) => setBirthDate((prev) => ({ ...prev, value: e.target.value }))}
                                  autoComplete='bday'
                                  sx={{ '& .MuiIconButton-root': { marginRight: 0 } }}
                                />}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="address"
                          label="Address"
                          placeholder="Block No.1, Street No.1, 5th Settlement, Cairo"
                          variant="outlined"
                          value={address.value}
                          onChange={(e) => setAddress((prev) => ({ ...prev, value: e.target.value }))}
                          error={address.error}
                          helperText={address.error ? address.errorMessage : ''}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>

                    <Grid item container columnGap={35.5} rowSpacing={4} wrap="nowrap">
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
                </Grid>
              </>
            ) : (
              // <SecondStep></SecondStep>
              <>
                <Grid container sx={{ mt: 6 }}>
                  <Grid container rowSpacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        label='Bio (optional)'
                        placeholder='Tell us more about you!'
                        name='bio'
                        fullWidth
                        multiline
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </Grid>

                    {
                      role === 'patient' ? (
                        <>
                          <Grid item container wrap="nowrap" columnGap={32.5}>
                            <Grid item xs={6}>
                              <TextField
                                id="weight"
                                label="Weight"
                                value={weight.value}
                                placeholder="Weight (kg)"
                                onChange={(e) => setWeight(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                                fullWidth
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                                type={'number'}
                                inputProps={{
                                  min: 0,
                                  step: 1,
                                }}
                                error={weight.error}
                                helperText={weight.error ? weight.errorMessage : ''}
                                required
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                id="height"
                                label="Height"
                                value={height.value}
                                placeholder="Height (cm)"
                                onChange={(e) => setHeight(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                                fullWidth
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                type={'number'}
                                inputProps={{
                                  min: 0,
                                  step: 1,
                                }}
                                error={height.error}
                                helperText={height.error ? height.errorMessage : ''}
                                required
                              />
                            </Grid>
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
                                value={otherDiseasesDetails.value}
                                placeholder="Please provide details for our doctors"
                                onChange={(e) => setOtherDiseasesDetails(prev => ({ ...prev, value: e.target.value }))}
                                error={otherDiseasesDetails.error}
                                helperText={otherDiseasesDetails.error ? otherDiseasesDetails.errorMessage : ''}
                                fullWidth
                                multiline
                                rows={2}
                                required
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
                                value={specialization.value}
                                placeholder="Specialization"
                                onChange={(e) => setSpecialization(prev => ({ ...prev, value: e.target.value }))}
                                error={specialization.error}
                                helperText={specialization.error ? specialization.errorMessage : ''}
                                fullWidth
                                required
                              />
                            </Grid>

                            <Grid item xs={6} sx={{ mx: 'auto' }}>
                              <ImageUploading
                                multiple
                                value={certificates}
                                onChange={handleCertificatesChange}
                                maxNumber={maxNumber}
                              >
                                {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemove,
                                  dragProps
                                }) => (
                                  <>
                                    <Typography variant="h5" color="initial" gutterBottom>
                                      Upload your certificates
                                    </Typography>
                                    <Stack direction="row" columnGap={2} justifyContent="center">
                                      <UploaderContainer {...dragProps} rowGap={2}>
                                        <FileUploadOutlinedIcon color="primary" fontSize='large' />
                                        <Typography sx={{ fontWeight: 'bold' }}>
                                          Drag and Drop images to upload
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'bold' }}>
                                          or
                                        </Typography>
                                        <Button onClick={onImageUpload} sx={{ borderRadius: '999999px', px: 3 }} variant="contained">Browse</Button>
                                        <Typography variant="subtitle1" color="textSecondary">
                                          Supported files: jpeg, jpg, png
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary">
                                          Maximum number of images: {maxNumber}
                                        </Typography>
                                      </UploaderContainer>

                                      {imageList.length > 0 && (<ImageListPreviewContainer>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                                          Certificates
                                        </Typography>
                                        {imageList.map((image, index) => (
                                          <Stack key={index} direction="row" spacing={2} sx={{ alignItems: 'center', px: 2 }}>
                                            <img src={image.dataURL} alt="image preview" width="25" />
                                            <Typography sx={{ flexGrow: 2 }} textAlign="start">
                                              {image?.file?.name}
                                            </Typography>
                                            <IconButton aria-label="remove image" onClick={() => onImageRemove(index)} color="error">
                                              <DeleteIcon />
                                            </IconButton>
                                          </Stack>
                                        ))}
                                      </ImageListPreviewContainer>)
                                      }
                                    </Stack>
                                  </>
                                )}
                              </ImageUploading>
                            </Grid>

                            <Grid item container wrap="nowrap" columnGap={32.5}>
                              <Grid item xs={6}>
                                <TextField
                                  id="experience"
                                  label="Years of Experience"
                                  value={yearsOfExperience.value}
                                  placeholder="2"
                                  onChange={(e) => setYearsOfExperience(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                                  fullWidth
                                  type={'number'}
                                  inputProps={{
                                    min: 0,
                                    max: 40,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="salary"
                                  label="Expected salary"
                                  value={expectedSalary.value || ''}
                                  placeholder="5,000"
                                  onChange={(e) => setExpectedSalary(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                                  fullWidth
                                  required
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    endAdornment: <InputAdornment position="end">/month</InputAdornment>,
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </>
                        )
                    }
                  </Grid>
                </Grid>
              </>
            )
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
  );
};

export default SignUpModal;