import { Check } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { Grid, IconButton, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import FriendCard from '../../components/FriendCard/FriendCard';
import { useAppSelector, useAppDispatch } from '../../redux/configureStore';
import { acceptFriendship, cancelFriendship } from '../../redux/users/users'
const FriendRequests = () => {
  const friendRequests = useAppSelector(state => state.user.friends.pending);
  const currentUserId = useAppSelector(state => state.user.userInfo.id);
  const dispatch = useAppDispatch();

  const cancelFriendShipRequest = (id: number) => {
    dispatch(cancelFriendship(id));
  }

  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      {
        friendRequests.length > 0 ? (
          friendRequests.map(({ userInfo, requester_id, id }) => (
            <Grid item md={6} key={userInfo.id}>
              <FriendCard
                userName={userInfo.name}
                userAvatar={userInfo.profilePic}
                userId={userInfo.id}
                role={userInfo.role}
                IconButtons={
                  requester_id === currentUserId ? (
                    [<IconButton children={<PersonAddDisabledIcon color="error" />}
                      key={uuidv4()} onClick={() => cancelFriendShipRequest(id)} />]
                  ) : (
                    [
                      <IconButton children={<Check color="primary" />}
                        key={uuidv4()} onClick={() => dispatch(acceptFriendship(id))} />,
                      <IconButton children={<DeleteOutlinedIcon color="error" />}
                        key={uuidv4()} onClick={() => cancelFriendShipRequest(id)} />
                    ]
                  )
                }
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" color="initial" textAlign="center">
              There are no friend requests at this time.
            </Typography>
          </Grid>
        )
      }
    </Grid>
  );
};

export default FriendRequests;
