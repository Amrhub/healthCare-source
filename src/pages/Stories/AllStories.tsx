import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import Story from '../../components/Story/Story';
import { useAppSelector } from '../../redux/configureStore';

const AllStories = () => {
  const { stories } = useAppSelector((state) => state.posts);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {stories.length > 0 ? (stories?.map((story: any) => (
        <Story key={story.id} story={story} handleEditStory={() => {}} />
      ))) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1">
            No stories yet.
          </Typography>
        </Box>
      )
      }
    </Box>
  );
};

export default AllStories;
