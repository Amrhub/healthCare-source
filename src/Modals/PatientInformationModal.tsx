import { Close } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Modal, IconButton, Tab, Typography, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

import ECGChart from '../pages/User/Home/ECGChart'
import ReportHistory from '../pages/User/ReportHistory/ReportHistory'
import { apiVersion, baseUrl } from '../redux/configureStore'
import { UserGeneralInfo } from '../redux/users/users'

import { ModalContainer } from './SignUpModal'



interface IProps {
  open: boolean;
  handleClose: () => void;
  user: UserGeneralInfo & { roleInfo: PatientInformation };
}

const PatientInformationModal = ({ open, handleClose, user }: IProps) => {
  const [value, setValue] = useState("1");
  const [address, setAddress] = useState<string>();
  const [addressTime, setAddressTime] = useState<Date>();

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  }

  const getLocationCords = async () => {
    const response = await fetch(
      `${baseUrl}${apiVersion}device_data/${user.roleInfo.device_id}`
    )

    const data = await response.json();

    const response2 = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.gps[0]},${data.gps[1]}6&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    const addressData = await response2.json();
    setAddress(addressData.results[0].formatted_address);
    setAddressTime(new Date(data.created_at));
  }

  useEffect(() => {
    if (value !== '3') return;
    getLocationCords();

  }, [value])

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: 'flex' }}>
      <ModalContainer sx={{ m: 'auto', height: '90%', position: 'relative' }}>
        <IconButton aria-label="close modal" onClick={handleClose} sx={{ position: 'absolute', right: 0, mr: 4 }}>
          <Close />
        </IconButton>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Patient Information" value="1" />
              <Tab label="Medical History" value="2" />
              <Tab label="ECG" value="3" />
              <Tab label="Last Location" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Typography color="initial" align="left" gutterBottom>Weight: {user.roleInfo.weight} kg</Typography>
            <Typography color="initial" align="left" gutterBottom>Height: {user.roleInfo.height} cm</Typography>
            <Typography color="initial" align="left" gutterBottom>Is smoking? {user.roleInfo.smoking ? "Yes" : "No"}</Typography>
            <Typography color="initial" align="left" gutterBottom>Has covid? {user.roleInfo.covid ? "Yes" : "No"}</Typography>
            <Typography color="initial" align="left" gutterBottom>Has diabetes? {user.roleInfo.diabetes ? "Yes" : "No"}</Typography>
            <Typography color="initial" align="left" gutterBottom>Has hypertension? {user.roleInfo.hypertension ? "Yes" : "No"}</Typography>
            {user.roleInfo.other_diseases_detail ?? <Typography color="initial" align="left" gutterBottom>Has mentioned other diseases? No</Typography>}
            {user.roleInfo.other_diseases_detail && <Typography color="initial" align="left">Other diseases: {user.roleInfo.other_diseases_detail}</Typography>}
          </TabPanel>
          <TabPanel value="2">
            {
              <Typography color="textPrimary" sx={{ m: 'auto', textAlign: 'left' }}>
                device id: {user.roleInfo.device_id}
                <br />
                patient name: {user.firstName} {user.lastName}
                <ReportHistory patientDeviceId={user.roleInfo.device_id} />
              </Typography>
            }
          </TabPanel>
          <TabPanel value="3" sx={{ height: '100%', width: '100%' }}>
            <Typography color="textPrimary" sx={{ m: 'auto', textAlign: 'left' }}>
              device id: {user.roleInfo.device_id}
              <br />
              patient name: {user.firstName} {user.lastName}
              <br />
              <b>Patient needs to be connected to the device</b>
            </Typography>

            <Stack sx={{ height: '80%', width: '100%', position: 'relative' }}>
              <ECGChart patientDeviceId={user.roleInfo.device_id} />
            </Stack>
          </TabPanel>
          <TabPanel value="4">
            {
              address ? (
                <Typography variant="h5" color="textPrimary" sx={{ m: 'auto', textAlign: 'center' }}>
                  Registered at: {addressTime?.toDateString()}, {addressTime?.toLocaleTimeString()}
                  <br />
                  Address: {address}
                  <iframe
                    width="1000"
                    height="600"
                    style={{ border: '0' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${address}`}
                  />
                </Typography>
              ) : (
                <Typography variant="h5" color="textPrimary" sx={{ m: 'auto', textAlign: 'center' }}>
                  No location data
                </Typography>
              )
            }
          </TabPanel>
        </TabContext>
      </ModalContainer>
    </Modal >
  )
}

export default PatientInformationModal