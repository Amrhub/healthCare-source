import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

import { MyLink } from '../../abstracts/Link';
interface FriendCardProps {
  userName: string;
  userAvatar: string;
  IconButtons: Array<React.ReactElement>;
  userId: number;
}
const FriendCard = ({ userName, userAvatar, IconButtons, userId }: FriendCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '26px',
        p: '20px 27px',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        height: { md: '120px' },
      }}
    >
      <MyLink to={`/user/profile/${userId}`}>
        <Avatar src={userAvatar} sx={{ width: { md: '80px' }, height: { md: '80px' } }} />
      </MyLink>
      <Typography variant="body1" sx={{ fontWeight: '700', fontSize: '24px' }}>
        {userName}
      </Typography>

      <Box sx={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
        {IconButtons}
      </Box>
    </Box>
  );
};

export default FriendCard;
