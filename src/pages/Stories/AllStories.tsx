import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import Story from '../../components/Story/Story';
import { useAppSelector } from '../../redux/configureStore';
import { StoryType } from '../../redux/stories/storySlice';

const AllStories = ({ posts, search = '' }: { posts?: StoryType[], search?: string }) => {
  const { stories } = useAppSelector((state) => state.posts);
  const [filteredPostsId, setFilteredPostsId] = useState<number[]>();

  useEffect(() => {
    if (!search) return setFilteredPostsId(stories?.map(story => story.id) || posts?.map(story => story.id));

    if (stories.length > 0) {
      const temp = stories.filter(({ category }) => category && category.toLowerCase().includes(search.toLowerCase()));
      setFilteredPostsId(temp.map(story => story.id));
    }
    if (posts) {
      const temp = stories.filter(({ category }) => category && category.toLowerCase().includes(search.toLowerCase()));

      setFilteredPostsId(temp.map(story => story.id));
    }
  }, [search])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {
        posts !== undefined ? (
          posts.length > 0 ? (posts?.map((story: any) => (
            <Story key={story.id} story={story} />
          ))) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                No stories yet.
              </Typography>
            </Box>
          )) : filteredPostsId ? (
            stories.filter(story => filteredPostsId.includes(story.id)).map((story: StoryType) => (
              <Story key={story.id} story={story} />
            ))
          ) : (
          stories.length > 0 ? (stories?.map((story) => (
            <Story key={story.id} story={story} />
          ))) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                No stories yet.
              </Typography>
            </Box>
          )
        )

      }
    </Box>
  );
};

export default AllStories;
