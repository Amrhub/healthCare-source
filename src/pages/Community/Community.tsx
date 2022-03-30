import { Divider } from '@mui/material';

import ContainerBox from '../../layouts/ContainerBox';
import { userRoutes } from '../../Routes/Routes';

import AddFriend from './AddFriend';
import CommunityNav from './CommunityNav';
import FriendRequests from './FriendRequests';
import Friends from './Friends';

const Community = () => {
  const pathName = window.location.pathname;
  const communityRoutes = userRoutes.community;

  const renderCommunityPages = () => {
    if (pathName === communityRoutes.index) return <Friends />;
    if (pathName === communityRoutes.friendRequest) return <FriendRequests />;
    if (pathName === communityRoutes.addFriend) return <AddFriend />;
  };
  return (
    <ContainerBox>
      <CommunityNav />
      <Divider
        sx={{
          bgcolor: 'grey.900',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          mb: 3,
        }}
      />
      {renderCommunityPages()}
    </ContainerBox>
  );
};

export default Community;
