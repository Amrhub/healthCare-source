import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box, styled } from '@mui/system';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../redux/configureStore';
import { removeStory } from '../../redux/stories/storySlice';
import { userRoutes } from '../../Routes/Routes';

import StoryFooter from './StoryFooter';

const StoryHeader = styled(Box)``;

const Story = ({
  story,
  handleEditStory,
}: {
  story: any;
  handleEditStory?: (content: string, category: string, storyId: number) => void | undefined;
}) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>();
  const isEditable = location.pathname === userRoutes.stories.myStories; // TODO: check if user is logged in
  const dispatch = useAppDispatch();

  const handleClick = (e: any) => {
    setOpen((prev) => !prev);
    setAnchorEl(e.currentTarget);
  };

  const handleEditClick = (e: any) => {
    handleClick(e);
    if (handleEditStory)
      handleEditStory(story.content, story.category, story.id);
  };

  const handleRemoveStory = (e: any) => {
    handleClick(e);
    dispatch(removeStory(story.id));
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
            {story.user.name}
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
          <MenuItem onClick={handleRemoveStory}>
            <DeleteOutlinedIcon sx={{ mr: 1 }} />
            Remove Story
          </MenuItem>
        </Menu>
      </StoryHeader>
      <Typography variant="body1" sx={{ color: 'grey.500' }} noWrap>
        {story.content}
      </Typography>
      <StoryFooter likesCounter={story.likesCounter} commentsCounter={story.commentsCounter} postId={story.id} />
    </Box>
  );
};

export default Story;
