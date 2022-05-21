import { Box } from '@mui/material';

import BioProfile from '../../components/Profile/BioProfile';
import StoriesProfile from '../../components/Profile/StoriesProfile';

const Profile = ({
  mainUser,
  stories,
  friend,
  friendRequest,
}: any) => {

  return (
    <Box sx={{ display: 'flex', gap: '50px' }}>
      <BioProfile
        user={stories[0].user}
        mainUser={mainUser}
        friend={friend}
        friendRequest={friendRequest}
      />
      <StoriesProfile mainUser={mainUser} stories={stories} />

    </Box>
  );
};

export default Profile;
