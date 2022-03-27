import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Grid } from '@mui/material';

import FriendCard from '../../components/FriendCard/FriendCard';

const Friends = () => {
  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<PersonRemoveIcon color="error" />]}
        />
      </Grid>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<PersonRemoveIcon color="error" />]}
        />
      </Grid>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<PersonRemoveIcon color="error" />]}
        />
      </Grid>
    </Grid>
  );
};

export default Friends;
