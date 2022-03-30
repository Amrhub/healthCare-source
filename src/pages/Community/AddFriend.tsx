import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { Grid } from '@mui/material';

import FriendCard from '../../components/FriendCard/FriendCard';

const AddFriend = () => {
  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<PersonAddDisabledIcon color="error" />]}
        />
      </Grid>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<PersonAddDisabledIcon color="error" />]}
        />
      </Grid>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<PersonAddIcon color="primary" />]}
        />
      </Grid>
    </Grid>
  );
};

export default AddFriend;
