import { Avatar, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface FriendCardProps {
  userName: string;
  userAvatar: string;
  icons: Array<any>;
}
const FriendCard = ({ userName, userAvatar, icons }: FriendCardProps) => {
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
      <Avatar src={userAvatar} sx={{ width: { md: '80px' }, height: { md: '80px' } }} />
      <Typography variant="body1" sx={{ fontWeight: '700', fontSize: '24px' }}>
        {userName}
      </Typography>

      <Box sx={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
        {icons.map((icon) => (
          <IconButton>{icon}</IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default FriendCard;
