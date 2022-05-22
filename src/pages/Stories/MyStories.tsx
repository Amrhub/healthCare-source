import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';

import Story from '../../components/Story/Story';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { getMyStories } from '../../redux/stories/storySlice';

const MyStories = ({
  handleEditStory,
}: {
  handleEditStory: (content: string, category: string, storyId: number) => void;
}) => {
  const stories = useAppSelector((state) => state.posts.myStories);
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.user.userInfo.id);

  useEffect(() => {
    dispatch(getMyStories(currentUserId));
  }, [dispatch, getMyStories]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {stories.length > 0 ? (
        stories?.map((story: any) => (
          <Story key={story.id} story={story} handleEditStory={handleEditStory} />
        ))
      ) : (
        <Typography variant="body1" align='center'>
          No stories yet.
        </Typography>
      )
      }
    </Box>
  );
};

export default MyStories;
