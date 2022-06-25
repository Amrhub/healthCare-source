

import { ArgumentAxis, Chart, SplineSeries, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

import { apiVersion, baseUrl, useAppSelector } from '../../../redux/configureStore';

const ECGChart = () => {
  const { hasDeviceConnected, deviceId } = useAppSelector(state => state.user.userInfo.roleInfo as RolePatientInfo);
  const [data, setData] = useState([]);
  const [lastDataTime, setLastDataTime] = useState('');
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);

  const fetchLastECGData = async () => {
    if (!hasDeviceConnected) return;
    const response = await fetch(`${baseUrl}${apiVersion}device_data/${deviceId}`);
    const responseData = await response.json();
    if (lastDataTime == '') {
      setLastDataTime(responseData.created_at);
      setData(responseData.ecg.map((ecg: any, index: number) => ({ argument: index + 1, value: ecg })));
    } else {
      if (responseData.created_at != lastDataTime) {
        setNumberOfAttempts(0);
        setData(responseData.ecg.map((ecg: any, index: number) => ({ argument: index + data.length, value: ecg })));
        setLastDataTime(responseData.created_at);
      } else {
        setNumberOfAttempts(prev => prev + 1);
      }
    }
  }
  useEffect(() => {
    if (!hasDeviceConnected) return;
    if (numberOfAttempts >= 10) return;

    const timeInterval = setInterval(() => {
      if (numberOfAttempts >= 10) clearInterval(timeInterval);
      fetchLastECGData();

      if (data.length > 20) {
        setData((prev) => prev.slice(1));
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [data, numberOfAttempts])

  return (
    <>
      {
        (numberOfAttempts > 0 && numberOfAttempts < 10) &&
        <Typography color="red" sx={{ position: 'absolute', zIndex: '999', left: '50%', transform: 'translateX(-50%)', mt: 2, bgcolor: 'white' }} align="center">
          There is no new data trying to fetch data from server...
          <br />
          <CircularProgress color="primary" />
        </Typography>
      }
      <Paper sx={{ width: '100%', position: 'relative' }}>

        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />
          <SplineSeries valueField="value" argumentField="argument" color="#4264D0" />
        </Chart>
        <Backdrop open={(data.length === 0 && hasDeviceConnected) || numberOfAttempts >= 10} sx={{ position: 'absolute', backdropFilter: 'blur(2000px)', zIndex: '200' }} >
          <Typography variant="h4" color="white" sx={{ display: 'flex' }} flexDirection="column">
            No live data available, please connect to the device and try again.
            <br />
            After connecting to the device, you can start reading data by pressing the start button.
            <br />
            <Button variant='contained' sx={{ mx: 'auto' }} onClick={() => setNumberOfAttempts(0)}>Start</Button>
          </Typography>
        </Backdrop>
      </Paper>
    </>
  );
};

export default ECGChart;
