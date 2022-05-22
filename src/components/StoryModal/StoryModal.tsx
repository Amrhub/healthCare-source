import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, IconButton, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import { dfCenterCenter } from '../../abstracts/common.styles';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { createStory } from '../../redux/stories/storySlice';

interface StoryModalProps {
  open: boolean;
  content?: string;
  category?: string;
  setOpen: (open: boolean) => void;
}

const ModalHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StoryModal = ({ content = '', category = '', open, setOpen }: StoryModalProps) => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user.userInfo);
  const isEdit = content.length > 0;
  const { profilePic, firstName, lastName } = useAppSelector((state) => state.user.userInfo);
  const [storyContent, setStoryContent] = useState(content);
  const [storyCategory, setStoryCategory] = useState(category);

  useEffect(() => {
    setStoryContent(content);
    setStoryCategory(category);
  }, [content, category]);

  const updateStory = (e: any) => {
    setStoryContent(e.target.value);
  };

  const updateCategory = (e: any) => {
    setStoryCategory(e.target.value);
  };

  const handleSubmit = (e: any) => {
    if (!isEdit) {
      dispatch(createStory({ content: storyContent, category: storyCategory, user_id: id }));
      setStoryCategory('');
      setStoryContent('');
      setOpen(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      sx={{
        ...dfCenterCenter,
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          width: { lg: '1000px' },
          p: '42px 52px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          borderRadius: '25px',
        }}
      >
        <ModalHeader>
          <Avatar src={profilePic} />
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {firstName} {lastName}
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            children={<CloseIcon />}
            sx={{ ml: 'auto', color: 'grey.900' }}
          />
        </ModalHeader>

        <TextField
          label={isEdit ? 'Edit your story' : 'Add your story'}
          variant="outlined"
          color="primary"
          margin="none"
          multiline
          rows={5}
          value={storyContent}
          sx={{ width: '100%' }}
          onChange={updateStory}
        />

        <Box sx={{ ml: 'auto' }}>
          <TextField
            sx={{ mr: 2 }}
            size="small"
            label="Category"
            value={storyCategory}
            onChange={updateCategory}
          />
          <Button variant="contained" sx={{ px: 4 }} onClick={handleSubmit}>
            {isEdit ? 'Edit' : 'Post'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StoryModal;
