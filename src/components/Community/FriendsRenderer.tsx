import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)({
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
});

const FriendsRenderer = ({
  friendsList,
  handleActiveChatClick,
  activeChat,
}: {
  friendsList: any;
  handleActiveChatClick: any;
  activeChat: any;
}) => {
  return (
    <List>
      {friendsList.map((friend: any) => {
        const isActive = activeChat.id === friend.id;
        return (
          <ListItem key={friend.id} sx={{ px: 0 }}>
            <ListItemButton
              sx={{
                borderRadius: '10px',
                backgroundColor: isActive ? 'grey.100' : 'transparent',
              }}
              onClick={() => {
                handleActiveChatClick(friend.id);
              }}
            >
              <StyledBadge
                overlap="circular"
                badgeContent=" "
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ mr: '12px' }}
                color={friend.status === 'online' ? 'success' : 'info'}
              >
                <Avatar src={friend.avatar} sx={{ width: '56px', height: '56px' }} />
              </StyledBadge>
              <ListItemText primary={friend.name} secondary="Lorem ipsum dolor sit" />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FriendsRenderer;
