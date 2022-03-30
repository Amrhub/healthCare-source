import { TextField } from '@mui/material';
import { Box, styled } from '@mui/system';

import MyNavLink from '../../abstracts/NavLink';
import { userRoutes } from '../../Routes/Routes';

const CommunityNavLink = styled(MyNavLink)`
  font-weight: 700;
  padding-bottom: 4px;
  height: max-content;
`;

const CommunityNav = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: { lg: '30px' },
        mb: 3,
        alignItems: 'center',
      }}
      className="communityNav"
    >
      <CommunityNavLink
        to={userRoutes.community.index}
        className={
          window.location.pathname == userRoutes.community.index ? 'active' : 'inActive'
        }
      >
        Friends
      </CommunityNavLink>
      <CommunityNavLink to={userRoutes.community.friendRequest}>
        Friend Requests
      </CommunityNavLink>
      <CommunityNavLink to={userRoutes.community.addFriend}>Add Friend</CommunityNavLink>
      <TextField sx={{ marginInlineStart: 'auto' }} placeholder="Search" size="small" />
    </Box>
  );
};

export default CommunityNav;
