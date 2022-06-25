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


const MyTableRow = ({ row }: { row: Row }) => {
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
        <TableCell align="center">{row.heart_rate}</TableCell>
        <TableCell align="center">{row.temperature}</TableCell>
        <TableCell align="center">{row.spo2}</TableCell>
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
                      <TableCell align="center">{historyRow.heart_rate}</TableCell>
                      <TableCell align="center">{historyRow.temperature}</TableCell>
                      <TableCell align="center">{historyRow.spo2}</TableCell>
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
