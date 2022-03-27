import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@mui/material/Paper';

const data = [
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
