import { Box } from '@mui/material';

import BioProfile from '../../components/Profile/BioProfile';
import StoriesProfile from '../../components/Profile/StoriesProfile';
import { StoryType } from '../../redux/stories/storySlice';

interface IProps {
  visitedUser?: any,
  mainUser: boolean,
  stories: StoryType[],
  friend: boolean,
  friendRequest: boolean,
}

const Profile = ({
  visitedUser,
  mainUser,
  stories,
  friend,
  friendRequest,
}: IProps) => {
  return (
    <Box sx={{ display: 'flex', gap: '50px' }}>
      <BioProfile
        user={stories[0]?.user ?? visitedUser}
        mainUser={mainUser}
        friend={friend}
        friendRequest={friendRequest}
      />
      <StoriesProfile mainUser={mainUser} userId={stories[0]?.user.id ?? visitedUser.id} />

    </Box>
  );
};

export default Profile;
