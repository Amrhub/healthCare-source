import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import StoryModal from '../../components/StoryModal/StoryModal';
import MyStories from '../../pages/Stories/MyStories';

interface IProps {
  mainUser: boolean;
  stories: any;
}

const StoriesProfile = ({ mainUser, stories }: IProps) => {
  const lastThreeStories = stories.slice(0, 3);
  console.log('🚀 ~ file: StoriesProfile.tsx ~ line 16 ~ StoriesProfile ~ lastThreeStories', lastThreeStories)


  const [openModal, setOpenModal] = useState(false);
  const [storyContent, setStoryContent] = useState('');
  const [storyCategory, setStoryCategory] = useState('');

  const addStoryClickHandler = () => {
    setStoryContent('');
    setStoryCategory('');
    setOpenModal(true);
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: '10px',
        height: '750px',
        width: '1032px',
        mt: 5,
        mb: 3,
        pl: '50px',
        pr: '50px',
        pb: '50px',
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <Box sx={{ textAlign: 'left', mt: 6, color: 'primary.main' }}>
        {mainUser ? (
          <Typography sx={{ fontWeight: 700, fontSize: '24px', mt: '10px' }}>
            My Story
          </Typography>
        ) : (
          <Typography sx={{ fontWeight: 700, fontSize: '24px', mt: '10px' }}>
            Stories
          </Typography>
        )}
        <Divider sx={{ my: 1, bgcolor: 'grey.900' }} />
      </Box>
      <MyStories stories={lastThreeStories} handleEditStory={(content, category) => {}} />
      {mainUser ? (
        <>
          <IconButton
            children={<AddIcon fontSize="large" />}
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              ':hover': {
                bgcolor: 'primary.main',
              },
              position: 'absolute',
              bottom: '3rem',
              right: '2rem',
            }}
            onClick={() => {
              addStoryClickHandler();
            }}
          />
          <StoryModal
            open={openModal}
            setOpen={setOpenModal}
            content={storyContent}
            category={storyCategory}
          />
        </>
      ) : (
        <>
          <IconButton
            children={<MessageIcon fontSize="large" />}
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              ':hover': {
                bgcolor: 'primary.main',
              },
              position: 'absolute',
              bottom: '3rem',
              right: '2rem',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default StoriesProfile;
