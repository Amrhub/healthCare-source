import { Check } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Grid } from '@mui/material';

import FriendCard from '../../components/FriendCard/FriendCard';
const FriendRequests = () => {
  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<Check color="primary" />, <DeleteOutlinedIcon color="error" />]}
        />
      </Grid>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<Check color="primary" />, <DeleteOutlinedIcon color="error" />]}
        />
      </Grid>
      <Grid item md={6}>
        <FriendCard
          userName="Mohamed Adel"
          userAvatar="https://i.pravatar.cc/300?img=3"
          icons={[<Check color="primary" />, <DeleteOutlinedIcon color="error" />]}
        />
      </Grid>
    </Grid>
  );
};

export default FriendRequests;
