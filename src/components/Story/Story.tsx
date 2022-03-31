import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Avatar, Button, Divider, Menu, MenuItem, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box, styled } from '@mui/system';
import { useState } from 'react';

const StoryHeader = styled(Box)``;
const Footer = styled(Box)``;

const Story = ({ story }: { story: any }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = story.user;

  const handleClick = (e: any) => {
    setOpen((prev) => !prev);
    setAnchorEl(e.currentTarget);
  };
  return (
    <Box
      sx={{
        boxShadow: 4,
        borderRadius: '16px',
        p: '18px 21px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mx: 7,
      }}
    >
      <StoryHeader sx={{ display: 'flex', gap: 3 }}>
        <Avatar
          alt="profile pic"
          src={user.avatar}
          sx={{ width: '40px', height: '40px' }}
        />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            {story.category}
          </Typography>
        </Box>
        <IconButton sx={{ ml: 'auto', color: 'grey.900' }}>
          <ExpandMoreIcon onClick={handleClick} fontSize="large" />
        </IconButton>
        <Menu open={open} onClose={handleClick} anchorEl={anchorEl}>
          <MenuItem onClick={handleClick}>
            <ModeEditIcon sx={{ mr: 1 }} />
            Edit Story
          </MenuItem>
          <MenuItem onClick={handleClick}>
            <DeleteOutlinedIcon sx={{ mr: 1 }} />
            Remove Story
          </MenuItem>
        </Menu>
      </StoryHeader>
      <Typography variant="body1" sx={{ color: 'grey.500' }}>
        {story.content}
      </Typography>
      <Footer>
        <Typography variant="body2" sx={{ color: 'grey.900', fontWeight: '700' }}>
          {story.likesCounter} Likes, {story.commentsCounter} Comments
        </Typography>
        <Divider sx={{ mt: 1, bgcolor: 'grey.900' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            startIcon={<ThumbUpAltIcon />}
            color="inherit"
            sx={{ fontWeight: '700' }}
          >
            Like
          </Button>
          <Button
            startIcon={<ChatBubbleOutlineIcon />}
            color="inherit"
            sx={{ fontWeight: '700' }}
          >
            Comment
          </Button>
        </Box>
      </Footer>
    </Box>
  );
};

export default Story;
