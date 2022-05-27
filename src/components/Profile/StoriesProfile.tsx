import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import StoryModal from '../../components/StoryModal/StoryModal';
import AllStories from '../../pages/Stories/AllStories';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { currentUserRecentStories, fetchUserStories } from '../../redux/stories/storySlice';

interface IProps {
  mainUser: boolean;
  userId: number;
}

const StoriesProfile = ({ mainUser, userId }: IProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [storyContent, setStoryContent] = useState('');
  const [storyCategory, setStoryCategory] = useState('');
  const dispatch = useAppDispatch();
  const { profileStories } = useAppSelector(state => state.posts);

  const addStoryClickHandler = () => {
    setStoryContent('');
    setStoryCategory('');
    setOpenModal(true);
  };


  // todo to be moved to redux for hot reloading
  useEffect(() => {
    if (mainUser) {
      dispatch(currentUserRecentStories());
    } else {
      dispatch(fetchUserStories(userId));
    }
  }, [])

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
      <Box sx={{ textAlign: 'left', mt: 2, color: 'primary.main' }}>
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
      <Box sx={{ py: 2 }}>
        <AllStories posts={profileStories} />
      </Box>
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
            onClick={addStoryClickHandler}
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
