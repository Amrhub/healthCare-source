import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import DeviceThermostatTwoToneIcon from '@mui/icons-material/DeviceThermostatTwoTone';
import { Popover, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useEffect, useState } from 'react';

import HeartMonitorCriticalIcon from '../../../assets/homePage/HeartbeatCriticalIcon.svg';
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

const HealthCards = () => {
  const { hasDeviceConnected, deviceId } = useAppSelector(state => state.user.userInfo.roleInfo as RolePatientInfo);
  const [data, setData] = useState<{ heart_rate: number, spo2: number, temperature: number }>();
  const [reportTime, setReportTime] = useState('');
  const [isHRCritical, setIsHRCritical] = useState(false);
  const [isSPO2Critical, setIsSPO2Critical] = useState(false);
  const [diseasePrediction, setDiseasePrediction] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const predictDisease = () => {
    if (!data) return;

    if (data.heart_rate > 100 || data.heart_rate < 60) {
      setIsHRCritical(true);
    } else {
      setIsHRCritical(false);
    }
    if (data.spo2 < 91) {
      setIsSPO2Critical(true);
    } else {
      setIsSPO2Critical(false);
    }

    if ((data.heart_rate > 100 && data.spo2 < 87) || (data.heart_rate < 60 && data.spo2 < 87))
      setDiseasePrediction('You have a critical condition, please contact your doctor');

    if (data.heart_rate < 60 && data.spo2 >= 92)
      setDiseasePrediction(
        "You have a Bradycardia, Bradycardia is a slow heart rate. The hearts of adults at rest usually beat between 60 and 100 times a minute. If you have bradycardia, your heart beats fewer than 60 times a minute"
      );
    if (data.heart_rate > 100 && data.spo2 >= 92)
      setDiseasePrediction(
        "You have a Tachycardia, Tachycardia is a fast heart rate. The hearts of adults at rest usually beat between 60 and 100 times a minute. If you have tachycardia, your heart beats more than 100 times a minute"
      );

    if (data.spo2 < 92 && data.temperature > 38)
      setDiseasePrediction("You have covid-19 syndromes");
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}${apiVersion}device_data/show_avg_hourly_data?device_id=${deviceId}`);
    const data = await response.json();
    setData(data.at(-1));
    setReportTime(data.at(-1).date);
  }

  useEffect(() => {
    if (!data) {
      fetchData();
    } else {
      predictDisease();
    }

    const interval = setInterval(() => {
      if (hasDeviceConnected) {
        fetchData();
        predictDisease();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [data])
  return (
    data ? (
      <>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
            width: '500px'
          }}
          open={!!anchorEl}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{diseasePrediction}</Typography>
        </Popover>
        <HealthCard
          sx={{
            bgcolor: isHRCritical ? 'error.main' : undefined,
            color: isHRCritical ? 'white' : 'black',
            '&:hover': { cursor: diseasePrediction && 'pointer' }
          }}
          onMouseEnter={(e) => diseasePrediction && setAnchorEl(e.currentTarget)}
          onMouseLeave={handlePopoverClose}
        >
          <Box>
            <HealthCardHeader>
              <Box>
                <HealthCardHeaderTitle>Heart Rate</HealthCardHeaderTitle>
                <Typography variant="body2">{reportTime}</Typography>
              </Box>
              <Box
                sx={{
                  backgroundImage: `url(${isHRCritical ? HeartMonitorCriticalIcon : HeartMonitorIcon})`,
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

        <HealthCard
          sx={{
            bgcolor: isSPO2Critical ? 'error.main' : undefined,
            color: isSPO2Critical ? 'white' : 'black',
            '&:hover': { cursor: diseasePrediction && 'pointer' }
          }}
          onMouseEnter={(e) => diseasePrediction && setAnchorEl(e.currentTarget)}
          onMouseLeave={handlePopoverClose}
        >
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
      </>
    )
  );
};

export default HealthCards;
