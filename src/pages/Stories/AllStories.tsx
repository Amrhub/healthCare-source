import { Box } from '@mui/system';

import Story from '../../components/Story/Story';

const AllStories = ({ stories }: { stories: any }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {stories?.map((story: any) => (
        <Story key={story.id} story={story} />
      ))}
    </Box>
  );
};

export default AllStories;
