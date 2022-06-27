import { Autocomplete, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';

import { apiVersion, baseUrl, useAppDispatch, useAppSelector } from '../../redux/configureStore'
import { fetchDevices, makeDeviceConnection } from '../../redux/device/deviceSlice';

const DevicesConnection = () => {
  const { devices } = useAppSelector(state => state.devices);
  const dispatch = useAppDispatch();
  const [patientsName, setPatientsName] = useState([{ label: '', id: 0 }]);
  const [categoriesName, setCategoriesName] = useState([{ label: '', id: 0 }]);
  const [patientId, setPatientId] = useState(0);
  const [categoryId, setCategoryId] = useState(0)
  const fetchPatientsName = async () => {
    const response = await fetch(
      `${baseUrl}${apiVersion}patients_name`
    )
    const data = await response.json();

    setPatientsName(data);
  }

  const fetchDeviceCategoriesName = async () => {
    const response = await fetch(
      `${baseUrl}${apiVersion}device_categories_name`
    )
    const data = await response.json();
    setCategoriesName(data);
  };

  useEffect(() => {
    dispatch(fetchDevices());
    fetchPatientsName();
    fetchDeviceCategoriesName();
  }, [])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(makeDeviceConnection({ patient_id: patientId, device_category_id: categoryId }));
  }
  return (
    <Stack justifyContent="center" alignItems="center" p={4} rowGap={4}>


      <Typography variant="h5">
        Make Devices' Connection
      </Typography>

      <form style={{ width: '1000px' }} onSubmit={submitHandler}>
        <Stack direction="row" columnGap={4}>
          <Autocomplete
            disablePortal
            options={patientsName}
            onChange={(event, newValue) => {
              if (!newValue) return
              setPatientId(newValue.id);
            }}
            sx={{ width: 300, flexGrow: 1 }}
            renderInput={(params) => <TextField {...params} label="Patient Name (ID)" size='small' required />}
          />
          <Autocomplete
            disablePortal
            options={categoriesName}
            onChange={(event, newValue) => {
              if (!newValue) return
              setCategoryId(newValue.id);
            }}
            sx={{ width: 300, flexGrow: 1 }}
            renderInput={(params) => <TextField {...params} label="Device Category Name (ID)" size='small' required />}
          />
          <Button type="submit" variant="contained">
            Make Connection
          </Button>
        </Stack>
      </form>

      <Typography variant="h5">
        Devices' Connection
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: '1000px', mx: 'auto', overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Patient Name (Patient ID)</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Device Category Name (ID)</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Device ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map(({ deviceId, deviceCategory, patientId, patientName, deviceCategoryId }) => (
              <TableRow
                key={deviceId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {patientName} ({patientId})
                </TableCell>
                <TableCell align="right">
                  {deviceCategory} ({deviceCategoryId})
                </TableCell>
                <TableCell align="right">
                  {deviceId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default DevicesConnection