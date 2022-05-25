import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import StoryModal from '../../components/StoryModal/StoryModal';
import AllStories from '../../pages/Stories/AllStories';
import { apiVersion, baseUrl, useAppSelector } from '../../redux/configureStore';
import { StoryType } from '../../redux/stories/storySlice';

interface IProps {
  mainUser: boolean;
  userId: number;
}

const StoriesProfile = ({ mainUser, userId }: IProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [storyContent, setStoryContent] = useState('');
  const [storyCategory, setStoryCategory] = useState('');
  const { myStories } = useAppSelector((state) => state.posts);
  const [stories, setStories] = useState<StoryType[]>([]);

  const addStoryClickHandler = () => {
    setStoryContent('');
    setStoryCategory('');
    setOpenModal(true);
  };

  const fetchUserStories = async () => {
    const response = await fetch(`${baseUrl}${apiVersion}/user_posts?user_id=${userId}`);
    const data = await response.json();
    setStories(data);
  }
  // todo to be moved to redux for hot reloading
  useEffect(() => {
    if (mainUser) {
      setStories(myStories.slice(0, 3))
    } else {
      fetchUserStories()
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
        <AllStories posts={stories} />
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
