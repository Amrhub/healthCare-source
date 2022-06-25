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
import { useEffect, useState } from 'react';

import LoadingScreen from '../../../Modals/LoadingScreen';
import NoDeviceConnected from '../../../Modals/NoDeviceConnected';
import { apiVersion, baseUrl, useAppSelector } from '../../../redux/configureStore';

import MyTableRow from './MyTableRow';

export const MyTableCell = styled(TableCell)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const ReportHistory = ({ patientDeviceId }: { patientDeviceId?: number }) => {
  const [rows, setRows] = useState<Row[]>();
  const { hasDeviceConnected, deviceId } = useAppSelector(state => state.user.userInfo.roleInfo as RolePatientInfo)
  const [isLoading, setIsLoading] = useState(true && hasDeviceConnected);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${baseUrl}${apiVersion}device_data/show_avg_hourly_data?device_id=${deviceId || patientDeviceId}`
    );
    const data = await response.json();
    setRows(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 7, position: 'relative', height: '100%' }}>
      {!patientDeviceId && <NoDeviceConnected />}

      <Typography component="h5" color="initial" gutterBottom>
        <Typography color="#23B59C" sx={{ display: 'inline-block' }}>
          Note:
        </Typography>
        These are average data
      </Typography>
      {isLoading && <LoadingScreen />}
      {
        rows ? (
          <TableContainer component={Paper} sx={{ maxHeight: !patientDeviceId ? '80vh' : '60vh', overflowY: 'auto' }}>
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
        ) : (
          <Typography component="h5" color="initial" gutterBottom>
            No data was registered, please check your device
          </Typography>
        )
      }
    </Box>
  );
};

export default ReportHistory;
