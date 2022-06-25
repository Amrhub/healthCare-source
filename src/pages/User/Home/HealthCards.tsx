import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import DeviceThermostatTwoToneIcon from '@mui/icons-material/DeviceThermostatTwoTone';
import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useEffect, useState } from 'react';

import HeartMonitorIcon from '../../../assets/homePage/HeartbeatIcon.svg';
import { apiVersion, baseUrl, useAppSelector } from '../../../redux/configureStore';
const HealthCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  color: theme.palette.grey[900],
  padding: '21px',
  [theme.breakpoints.up('sm')]: {
    height: '150px',
    width: '250px',
  },
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
}));

const HealthCardHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const HealthCardHeaderTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
`;

const HealthCardBody = styled(Typography)`
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  font-weight: 700;
  & > span {
    font-size: 16px;
  }
`;

const reportTime = 'Today, 12:13 PM';

const HealthCards = () => {
  const { hasDeviceConnected, deviceId } = useAppSelector(state => state.user.userInfo.roleInfo as RolePatientInfo);
  const [data, setData] = useState<{ heart_rate: number, spo2: number, temperature: number }>();
  const [reportTime, setReportTime] = useState('');

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}${apiVersion}device_data/show_avg_hourly_data?device_id=${deviceId}`);
    const data = await response.json();
    setData(data.at(-1));
    setReportTime(data.at(-1).date);
  }

  useEffect(() => {
    if (hasDeviceConnected)
      fetchData();
  }, [])
  return (
    data ? (
      <>
        <HealthCard sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
          <Box>
            <HealthCardHeader>
              <Box>
                <HealthCardHeaderTitle>Heart Rate</HealthCardHeaderTitle>
                <Typography variant="body2">{reportTime}</Typography>
              </Box>
              <Box
                sx={{
                  backgroundImage: `url(${HeartMonitorIcon})`,
                  backgroundSize: 'contain',
                  width: '36px',
                  aspectRatio: '1',
                }}
              />
            </HealthCardHeader>
          </Box>
          <HealthCardBody variant="h4">
            {data.heart_rate} <span>BPM</span>
          </HealthCardBody>
        </HealthCard>
        <HealthCard>
          <Box>
            <HealthCardHeader>
              <Box>
                <HealthCardHeaderTitle>Temperature</HealthCardHeaderTitle>
                <Typography variant="body2">{reportTime}</Typography>
              </Box>
              <DeviceThermostatTwoToneIcon sx={{ width: '35px', height: '35px' }} />
            </HealthCardHeader>
          </Box>
          <HealthCardBody variant="h4">
            {data.temperature} <span>°C</span>
          </HealthCardBody>
        </HealthCard>
        <HealthCard>
          <Box>
            <HealthCardHeader>
              <Box>
                <HealthCardHeaderTitle>Blood Oxygen</HealthCardHeaderTitle>
                <Typography variant="body2">{reportTime}</Typography>
              </Box>
              <BloodtypeOutlinedIcon sx={{ width: '35px', height: '35px' }} />
            </HealthCardHeader>
          </Box>
          <HealthCardBody variant="h4">
            {data.spo2} <span>%</span>
          </HealthCardBody>
        </HealthCard>
      </>
    ) : (
      <>
        <HealthCard sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
          <Box>
            <HealthCardHeader>
              <Box>
                <HealthCardHeaderTitle>Heart Rate</HealthCardHeaderTitle>
                <Typography variant="body2">____-__-__</Typography>
              </Box>
              <Box
                sx={{
                  backgroundImage: `url(${HeartMonitorIcon})`,
                  backgroundSize: 'contain',
                  width: '36px',
                  aspectRatio: '1',
                }}
              />
            </HealthCardHeader>
          </Box>
          <HealthCardBody variant="h4">
            -- <span>BPM</span>
          </HealthCardBody>
        </HealthCard>
        <HealthCard>
          <Box>
            <HealthCardHeader>
              <Box>
                <HealthCardHeaderTitle>Temperature</HealthCardHeaderTitle>
                <Typography variant="body2">____-__-__</Typography>
              </Box>
              <DeviceThermostatTwoToneIcon sx={{ width: '35px', height: '35px' }} />
            </HealthCardHeader>
          </Box>
          <HealthCardBody variant="h4">
            -- <span>°C</span>
          </HealthCardBody>
        </HealthCard>
        <HealthCard>
          <Box>
            <HealthCardHeader>
              <Box>
                <HealthCardHeaderTitle>Blood Oxygen</HealthCardHeaderTitle>
                <Typography variant="body2">____-__-__</Typography>
              </Box>
              <BloodtypeOutlinedIcon sx={{ width: '35px', height: '35px' }} />
            </HealthCardHeader>
          </Box>
          <HealthCardBody variant="h4">
            -- <span>%</span>
          </HealthCardBody>
        </HealthCard>
      </>
    )
  );
};

export default HealthCards;
