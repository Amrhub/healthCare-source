import { Divider } from '@mui/material';

import ContainerBox from '../../layouts/ContainerBox/ContainerBox';
import ContainerBoxNav, {
  ContainerBoxNavLink,
} from '../../layouts/ContainerBox/ContainerBoxNav';
import { userRoutes } from '../../Routes/Routes';

import AddFriend from './AddFriend';
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
      <ContainerBoxNav>
        <ContainerBoxNavLink
          to={userRoutes.community.index}
          className={
            window.location.pathname == userRoutes.community.index ? 'active' : 'inActive'
          }
        >
          Friends
        </ContainerBoxNavLink>
        <ContainerBoxNavLink to={userRoutes.community.friendRequest}>
          Friend Requests
        </ContainerBoxNavLink>
        <ContainerBoxNavLink to={userRoutes.community.addFriend}>
          Add Friend
        </ContainerBoxNavLink>
      </ContainerBoxNav>
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
