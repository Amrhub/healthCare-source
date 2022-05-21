import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Avatar, Button, Divider, Menu, MenuItem, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box, styled } from '@mui/system';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { userRoutes } from '../../Routes/Routes';

const StoryHeader = styled(Box)``;
const Footer = styled(Box)``;

const Story = ({
  story,
  handleEditStory,
}: {
  story: any;
  handleEditStory: (content: string, category: string) => void | undefined;
}) => {
  console.log({ story })
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isEditable = location.pathname === userRoutes.stories.myStories; // TODO: check if user is logged in

  const handleClick = (e: any) => {
    setOpen((prev) => !prev);
    setAnchorEl(e.currentTarget);
  };

  const handleEditClick = (e: any) => {
    handleClick(e);
    handleEditStory(story.content, story.category);
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
          src={story.user.profilePic}
          sx={{ width: '40px', height: '40px' }}
        />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {story.user.firstName} {story.user.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            {story.category}
          </Typography>
        </Box>
        <IconButton
          sx={{
            ml: 'auto',
            color: 'grey.900',
            display: isEditable ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleClick}
        >
          <ExpandMoreIcon fontSize="large" />
        </IconButton>
        <Menu
          open={open}
          onClose={handleClick}
          anchorEl={anchorEl}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MenuItem onClick={handleEditClick}>
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
