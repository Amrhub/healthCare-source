import { Divider } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ContainerBox from '../../layouts/ContainerBox/ContainerBox';
import ContainerBoxNav, {
  ContainerBoxNavLink,
} from '../../layouts/ContainerBox/ContainerBoxNav';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { fetchFriendships } from '../../redux/users/users';
import { userRoutes } from '../../Routes/Routes';

import AddFriend from './AddFriend';
import FriendRequests from './FriendRequests';
import Friends from './Friends';

const Community = () => {
  const userId = useAppSelector(state => state.user.userInfo.id);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { pathname } = location;
  const communityRoutes = userRoutes.community;

  const renderCommunityPages = () => {
    if (pathname === communityRoutes.index) return <Friends />;
    if (pathname === communityRoutes.friendRequest) return <FriendRequests />;
    if (pathname === communityRoutes.addFriend) return <AddFriend />;
  };

  useEffect(() => {
    dispatch(fetchFriendships(userId));
  }, [pathname])
  return (
    <ContainerBox>
      <ContainerBoxNav>
        <ContainerBoxNavLink to={userRoutes.community.index} end>
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
