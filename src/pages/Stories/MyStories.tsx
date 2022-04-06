import { Box } from '@mui/system';

import Story from '../../components/Story/Story';

const MyStories = ({
  stories,
  handleEditStory,
}: {
  stories: any;
  handleEditStory: (content: string, category: string) => void;
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {stories?.map((story: any) => (
        <Story key={story.id} story={story} handleEditStory={handleEditStory} />
      ))}
    </Box>
  );
};

export default MyStories;
