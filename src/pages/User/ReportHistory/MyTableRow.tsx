import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

interface RowProp {
  date: string;
  heartRate: string;
  temperature: string;
  bloodOxygen: string;
  history: {
    time: string;
    heartRate: string;
    temperature: string;
    bloodOxygen: string;
  }[];
}

const MyTableRow = ({ row }: { row: RowProp }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.date}
        </TableCell>
        <TableCell align="center">{row.heartRate}</TableCell>
        <TableCell align="center">{row.temperature}</TableCell>
        <TableCell align="center">{row.bloodOxygen}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 'bold' }}
              >
                History
              </Typography>
              <Table size="small" aria-label="date details">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Heart Rate (BPM)</TableCell>
                    <TableCell align="center">Temperature (c)</TableCell>
                    <TableCell align="center">Blood Oxygen (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.time}>
                      <TableCell component="th" scope="row" align="center">
                        {historyRow.time}
                      </TableCell>
                      <TableCell align="center">{historyRow.heartRate}</TableCell>
                      <TableCell align="center">{historyRow.temperature}</TableCell>
                      <TableCell align="center">{historyRow.bloodOxygen}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default MyTableRow;
