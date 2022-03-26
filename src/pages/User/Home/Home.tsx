import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { dfCenterCenter } from '../../../abstracts/common.styles';
import HomePageBG from '../../../assets/homePage/home_header-bg.svg';

import ECGChart from './ECGChart';
import HealthCards from './HealthCards';
const Home = () => {
  const user = useSelector((state: any) => state.users.authUserInfo);
  return (
    <Box
      sx={{ minHeight: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={{
          height: { lg: '250px' },
          background: `url(${HomePageBG})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          p: { lg: '41px 74px' },
        }}
      >
        <Box sx={{ ...dfCenterCenter, width: 'max-content' }}>
          <Avatar
            src={user.avatar}
            alt="avatar"
            sx={{ width: { lg: '165px' }, height: { lg: '165px' } }}
          />
          <Typography variant="h4" ml={4}>
            {user.name}
          </Typography>
        </Box>
      </Box>

      <Grid
        container
        py={4}
        px={10}
        sx={{ height: '70%', m: 'auto', justifyContent: 'space-between' }}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <HealthCards />
        </Grid>
        <Grid item xs={8}>
          <ECGChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
