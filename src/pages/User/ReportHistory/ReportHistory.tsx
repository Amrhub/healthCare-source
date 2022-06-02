import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import MyTableRow from './MyTableRow';

export const MyTableCell = styled(TableCell)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const rows = [
  {
    date: '2022-01-05',
    heartRate: '84',
    temperature: '36.5',
    bloodOxygen: '92',
    history: [
      {
        time: '12 AM',
        heartRate: '84',
        temperature: '36.5',
        bloodOxygen: '92',
      },
      {
        time: '1 AM',
        heartRate: '84',
        temperature: '36.5',
        bloodOxygen: '92',
      },
    ],
  },
  {
    date: '2022-01-06',
    heartRate: '84',
    temperature: '36.5',
    bloodOxygen: '92',
    history: [
      {
        time: '12 AM',
        heartRate: '84',
        temperature: '36.5',
        bloodOxygen: '92',
      },
      {
        time: '1 AM',
        heartRate: '84',
        temperature: '36.5',
        bloodOxygen: '92',
      },
    ],
  },
  {
    date: '2022-01-07',
    heartRate: '84',
    temperature: '36.5',
    bloodOxygen: '92',
    history: [
      {
        time: '12 AM',
        heartRate: '84',
        temperature: '36.5',
        bloodOxygen: '92',
      },
      {
        time: '1 AM',
        heartRate: '84',
        temperature: '36.5',
        bloodOxygen: '92',
      },
    ],
  },
  {
    date: '2022-01-08',
    heartRate: '84',
    temperature: '36.5',
    bloodOxygen: '92',
    history: [
      {
        time: '12 AM',
        heartRate: '84',
        temperature: '36.5',
        bloodOxygen: '92',
      },
      {
        time: '1 AM',
        heartRate: '84',
        temperature: '36.5',
        bloodOxygen: '92',
      },
    ],
  },
];

const ReportHistory = () => {
  return (
    <Box sx={{ p: 7 }}>
      <Typography component="h5" color="initial" gutterBottom>
        <Typography color="#23B59C" sx={{ display: 'inline-block' }}>
          Note:
        </Typography>
        These are average data
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '80vh', overflowY: 'scroll' }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <MyTableCell>Date</MyTableCell>
              <MyTableCell>Heart Rate (BPM)</MyTableCell>
              <MyTableCell>Temperature (c)</MyTableCell>
              <MyTableCell>Blood Oxygen (%)</MyTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <MyTableRow key={row.date} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportHistory;
