import { Check } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import FriendCard from '../../components/FriendCard/FriendCard';
import { userRoutes } from '../../Routes/Routes';
const FriendRequests = () => {
  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      <Grid item md={6}>
        <Link
          to={userRoutes.profile.community}
          style={{ textDecoration: 'none', color: '#4264D0' }}
        >
          <FriendCard
            userName="Mohamed Adel"
            userAvatar="https://i.pravatar.cc/300?img=3"
            icons={[<Check color="primary" />, <DeleteOutlinedIcon color="error" />]}
          />
        </Link>
      </Grid>
      <Grid item md={6}>
        <Link to={userRoutes.profile.community} style={{ textDecoration: 'none', color: '#4264D0' }}>
          <FriendCard
            userName="Mohamed Adel"
            userAvatar="https://i.pravatar.cc/300?img=3"
            icons={[<Check color="primary" />, <DeleteOutlinedIcon color="error" />]}
          />
        </Link>
      </Grid>
      <Grid item md={6}>
        <Link to={userRoutes.profile.community} style={{ textDecoration: 'none', color: '#4264D0' }}>
          <FriendCard
            userName="Mohamed Adel"
            userAvatar="https://i.pravatar.cc/300?img=3"
            icons={[<Check color="primary" />, <DeleteOutlinedIcon color="error" />]}
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default FriendRequests;
