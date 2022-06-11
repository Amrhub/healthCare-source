

import { ArgumentAxis, Chart, SplineSeries, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../../../redux/configureStore';

const data2 = [
  { argument: 1, value: 40 },
  { argument: 1.2, value: 50 },
  { argument: 1.4, value: 30 },
  { argument: 1.6, value: 50 },
  { argument: 1.7, value: 40 },
  { argument: 1.8, value: 50 },
  { argument: 1.9, value: 40 },
  { argument: 2, value: 50 },
  { argument: 2.2, value: 40 },
  { argument: 2.4, value: 50 },
  { argument: 2.6, value: 42 },
];

const ECGChart = () => {
  const { hasDeviceConnected } = useAppSelector(state => state.user.userInfo.roleInfo as RolePatientInfo);
  const [data, setData] = useState(data2);
  useEffect(() => {
    if (!hasDeviceConnected) return;
    const timeInterval = setInterval(() => {
      setData((prev) => (
        [...prev, { argument: prev[prev.length - 1].argument + 0.2, value: Math.random() * 100 }]
      ));
      if (data.length > 20) {
        setData((prev) => prev.slice(1));
      }

    }, 1000);

    return () => clearInterval(timeInterval);
  }, [data])

  return (
    <Paper sx={{ height: '100%' }}>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />
        <SplineSeries valueField="value" argumentField="argument" color="#4264D0" />
      </Chart>
    </Paper>
  );
};

export default ECGChart;
