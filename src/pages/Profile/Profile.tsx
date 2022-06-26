import { Box } from '@mui/material';

import BioProfile, { UserInfo } from '../../components/Profile/BioProfile';
import StoriesProfile from '../../components/Profile/StoriesProfile';
import { UserGeneralInfo } from '../../redux/users/users';

export interface ProfilePropsFriendRequest {
  requester_id?: number;
  requestee_id?: number;
  bool: boolean;
}

interface IProps {
  visitedUser?: UserGeneralInfo,
  mainUser: boolean,
  mainUserInfo?: UserGeneralInfo,
  friend: boolean,
  friendRequest: ProfilePropsFriendRequest,
}

const Profile = ({
  visitedUser,
  mainUser,
  mainUserInfo,
  friend,
  friendRequest,
}: IProps) => {
  return (
    <Box sx={{ display: 'flex', gap: '50px' }}>
      <BioProfile
        user={mainUser ? mainUserInfo as UserInfo : visitedUser as UserInfo}
        mainUser={mainUser}
        friend={friend}
        friendRequest={friendRequest}
      />
      <StoriesProfile mainUser={mainUser} userId={mainUserInfo?.id as number ?? visitedUser?.id as number} />

    </Box>
  );
};

export default Profile;
