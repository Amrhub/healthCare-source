import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

import DMChatContainer from './DMChatContainer';
import FriendsRenderer from './FriendsRenderer';

const friendsList = [
  {
    id: 1,
    name: 'Emily Washington',
    avatar: 'https://i.pravatar.cc/300?img=1',
    status: 'online',
  },
  {
    id: 2,
    name: 'Alice Jackson',
    avatar: 'https://i.pravatar.cc/300?img=2',
    status: 'offline',
  },
  {
    id: 3,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/300?img=3',
    status: 'online',
  },
  {
    id: 4,
    name: 'Jane Davis',
    avatar: 'https://i.pravatar.cc/300?img=4',
    status: 'online',
  },
];

const Chat = () => {
  const [isFriendsTabActive, setIsFriendsTabActive] = useState(true);
  const [isChannelsTabActive, setIsChannelsTabActive] = useState(false);
  const [activeChat, setActiveChat] = useState({
    id: 1,
    name: 'Emily Washington',
    avatar: 'https://i.pravatar.cc/300?img=1',
    status: 'online',
  });

  const handleFriendsTabClick = () => {
    setIsFriendsTabActive(true);
    setIsChannelsTabActive(false);
  };

  const handleChannelsTabClick = () => {
    setIsChannelsTabActive(true);
    setIsFriendsTabActive(false);
  };

  const handleActiveChatClick = (id: number) => {
    setActiveChat(friendsList[id - 1]);
  };

  return (
    <Box sx={{ height: '100%', backgroundColor: 'grey.100', display: 'flex' }}>
      <Box
        sx={{
          height: '100%',
          width: '390px',
          padding: '35px 15px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          backgroundColor: 'white',
          color: 'grey.900',
          filter: 'drop-shadow(1px 0px 4px rgba(0, 0, 0, 0.25))',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            padding: '0 25px',
          }}
        >
          <Typography variant="h2" sx={{ fontFamily: '"roboto", sans-serif' }}>
            Chats
          </Typography>
          <TextField label="Search" variant="outlined" size="small" />
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Button
              variant={isFriendsTabActive ? 'contained' : 'text'}
              sx={{ flexGrow: '1', color: `${isFriendsTabActive ? 'white' : 'inherit'}` }}
              onClick={handleFriendsTabClick}
            >
              Friends
            </Button>
            <Button
              variant={isChannelsTabActive ? 'contained' : 'text'}
              sx={{
                flexGrow: '1',
                color: `${isChannelsTabActive ? 'white' : 'inherit'}`,
              }}
              onClick={handleChannelsTabClick}
            >
              Channels
            </Button>
          </Box>
        </Box>
        {isFriendsTabActive && (
          <FriendsRenderer
            friendsList={friendsList}
            handleActiveChatClick={handleActiveChatClick}
            activeChat={activeChat}
          />
        )}
        {isChannelsTabActive && <p>Channels under construction</p>}
      </Box>

      <DMChatContainer chattingPerson={activeChat} />
    </Box>
  );
};

export default Chat;
