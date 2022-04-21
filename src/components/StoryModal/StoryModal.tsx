import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, IconButton, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { dfCenterCenter } from '../../abstracts/common.styles';

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
  const isEdit = content.length > 0;
  const currentUser = useSelector((state: any) => state.users.authUserInfo);
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
          <Avatar src={currentUser.avatar} />
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {currentUser.name}
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
          <Button variant="contained" sx={{ px: 4 }}>
            {isEdit ? 'Edit' : 'Post'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StoryModal;
