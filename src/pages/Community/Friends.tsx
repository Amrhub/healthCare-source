import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import FriendCard from '../../components/FriendCard/FriendCard';
import { userRoutes } from '../../Routes/Routes';

const Friends = () => {
  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      <Grid item md={6}>
        <Link to={userRoutes.profile.community} style={{ textDecoration: 'none', color: '#4264D0' }}>
          <FriendCard
            userName="Mohamed Adel"
            userAvatar="https://i.pravatar.cc/300?img=3"
            icons={[<PersonRemoveIcon color="error" />]}
          />
        </Link>
      </Grid>
      <Grid item md={6}>
        <Link to={userRoutes.profile.community} style={{ textDecoration: 'none', color: '#4264D0' }}>
          <FriendCard
            userName="Mohamed Adel"
            userAvatar="https://i.pravatar.cc/300?img=3"
            icons={[<PersonRemoveIcon color="error" />]}
          />
        </Link>
      </Grid>
      <Grid item md={6}>
        <Link to={userRoutes.profile.community} style={{ textDecoration: 'none', color: '#4264D0' }}>
          <FriendCard
            userName="Mohamed Adel"
            userAvatar="https://i.pravatar.cc/300?img=3"
            icons={[<PersonRemoveIcon color="error" />]}
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default Friends;
