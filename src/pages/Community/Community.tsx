import { Box, Divider } from '@mui/material';
import Container from '@mui/material/Container';

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
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Container
        sx={{
          bgcolor: 'background.paper',
          maxWidth: { md: '1032px' },
          height: '90%',
          my: 'auto',
          boxShadow: 4,
          borderRadius: '10px',
          color: 'grey.900',
          p: '38px 60px',
        }}
        fixed
        disableGutters
      >
        <CommunityNav />
        <Divider
          sx={{
            bgcolor: 'grey.900',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            mb: 3,
          }}
        />
        {renderCommunityPages()}
      </Container>
    </Box>
  );
};

export default Community;
