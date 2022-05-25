import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Grid, IconButton, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import FriendCard from '../../components/FriendCard/FriendCard';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { cancelFriendship } from '../../redux/users/users';


const Friends = () => {
  const friends = useAppSelector(state => state.user.friends.accepted);
  const dispatch = useAppDispatch();

  const removeFriend = (id: number) => {
    dispatch(cancelFriendship(id));
  };

  return (
    <Grid container columnGap={2} rowGap={3}>
      {
        friends.length > 0 ? (
          friends.map(({ userInfo, id }) => (
            <Grid item md={6} key={userInfo.id}>
              <FriendCard
                userName={userInfo.name}
                userAvatar={userInfo.profilePic}
                userId={userInfo.id}
                IconButtons={[<IconButton children={<PersonRemoveIcon color="error" />} key={uuidv4()}
                  onClick={() => { removeFriend(id) }} />]}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" color="initial" textAlign="center">
              You have no friends yet, go to the community and add some friends!
            </Typography>
          </Grid>
        )
      }
    </Grid>
  );
};

export default Friends;
