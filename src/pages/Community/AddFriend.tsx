import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

import FriendCard from '../../components/FriendCard/FriendCard';
import { apiVersion, baseUrl, useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { makeFriendship } from '../../redux/users/users';

interface UserOverview {
  id: number;
  name: string;
  profilePic: string;
}

const AddFriend = () => {
  const [users, setUsers] = useState<UserOverview[]>([]);
  const friends = useAppSelector(state => state.user.friends);
  const currentUserId = useAppSelector(state => state.user.userInfo.id);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const fetchData = async () => {
    const response = await fetch(`${baseUrl}${apiVersion}/users`);
    const data = await response.json();
    stripFriendsFromUsers(data);
  };

  const stripFriendsFromUsers = (allUsers: UserOverview[]) => {
    const users = allUsers.filter(user => (
      !friends.accepted.some(friend => friend.userInfo.id === user.id)
      && !friends.pending.some(friend => friend.userInfo.id === user.id)
      && !friends.blocked.some(friend => friend.userInfo.id === user.id)
      && user.id !== currentUserId
    ));

    setUsers(users);
  };

  const addFriend = ({ requesteeId }: { requesteeId: number }) => {
    dispatch(makeFriendship({ requestee_id: requesteeId, requester_id: currentUserId }));
    setUsers(users.filter(user => user.id !== requesteeId));
  };

  useEffect(() => {
    fetchData();
  }
    , []);
  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      {
        users?.map(user => (
          <Grid item md={6} key={user.id}>
            <FriendCard
              userName={`${user.name}`}
              userAvatar={user.profilePic}
              IconButtons={[<IconButton children={<PersonAddIcon color="primary" />} onClick={() => { addFriend({ requesteeId: user.id }) }} key={user.id} />]}
            />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default AddFriend;
