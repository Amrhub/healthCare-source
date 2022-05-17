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
  const [birthDate, setBirthDate] = useState('1988-01-01');
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
    console.log(imageList, addUpdateIndex);
    setCertificates(imageList as never[]);
  };

  const ProfilePictureInput = styled('input')({
    display: 'none',
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) // TODO: call the api and return 
      console.log("submit");
    // return
  };

  const isFormValid = () => {
    const isValid = true;
    // TODO: validate the form
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
                  <Grid container columnSpacing={35.5} rowSpacing={4}>
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
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="email"
                        label="Email"
                        placeholder='example@email.com'
                        variant="outlined"
                        value={email.value}
                        onChange={(e) => setEmail((prev) => ({ ...prev, value: e.target.value }))}
                        error={email.error}
                        helperText={email.error ? email.errorMessage : ''}
                        fullWidth
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
                      />
                    </Grid>

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
                        InputProps={{
                          endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => setPasswordVisibility((prev) => !prev)}>
                              {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>,
                        }}
                      />

                      {/* <FormControl fullWidth>
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
                      </FormControl> */}

                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="passwordConfirmation"
                        label="Confirm Password"
                        placeholder='********'
                        variant="outlined"
                        value={confirmPassword.value}
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
                      />
                      {/* <FormControl fullWidth>
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
                      </FormControl> */}
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
                        id="address"
                        label="Address"
                        placeholder="Block No.1, Street No.1, 5th Settlement, Cairo"
                        variant="outlined"
                        value={address.value}
                        onChange={(e) => setAddress((prev) => ({ ...prev, value: e.target.value }))}
                        error={address.error}
                        helperText={address.error ? address.errorMessage : ''}
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
                                onChange={(e) => {
                                  setWeight(prev => ({ ...prev, value: parseFloat(e.target.value) }))
                                  console.log(weight.value)
                                }}
                                fullWidth
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                                type={'number'}
                                inputProps={{
                                  min: 0,
                                  step: 1,
                                }}
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
                                value={otherDiseasesDetails}
                                placeholder="Please provide details for our doctors"
                                onChange={(e) => setOtherDiseasesDetails(prev => ({ ...prev, value: e.target.value }))}
                                error={otherDiseasesDetails.error}
                                helperText={otherDiseasesDetails.error ? otherDiseasesDetails.errorMessage : ''}
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
                                value={specialization.value}
                                placeholder="Specialization"
                                onChange={(e) => setSpecialization(prev => ({ ...prev, value: e.target.value }))}
                                error={specialization.error}
                                helperText={specialization.error ? specialization.errorMessage : ''}
                                fullWidth
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
                                  onImageRemoveAll,
                                  onImageUpdate,
                                  onImageRemove,
                                  isDragging,
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