import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import FriendCard from '../../components/FriendCard/FriendCard';
import { userRoutes } from '../../Routes/Routes';

const AddFriend = () => {
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
            icons={[<PersonAddDisabledIcon color="error" />]}
          />
        </Link>
      </Grid>
      <Grid item md={6}>
        <Link
          to={userRoutes.profile.community}
          style={{ textDecoration: 'none', color: '#4264D0' }}
        >
          <FriendCard
            userName="Mohamed Adel"
            userAvatar="https://i.pravatar.cc/300?img=3"
            icons={[<PersonAddDisabledIcon color="error" />]}
          />
        </Link>
      </Grid>
      <Grid item md={6}>
        <Link
          to={userRoutes.profile.community}
          style={{ textDecoration: 'none', color: '#4264D0' }}
        >
          <FriendCard
            userName="Mohamed Adel"
            userAvatar="https://i.pravatar.cc/300?img=3"
            icons={[<PersonAddIcon color="primary" />]}
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default AddFriend;
